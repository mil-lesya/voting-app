use chrono::DateTime;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{AccountId, env, near_bindgen, PanicOnDefault};
use near_sdk::collections::{UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, BorshDeserialize, BorshSerialize, Debug)]
pub struct Poll {
    id: usize,
    owner: AccountId,
    description: String,
    start_time: Option<String>,
    end_time: Option<String>,
    options: Vec<Variant>,
}

#[derive(Deserialize, Serialize, BorshDeserialize, BorshSerialize, Debug)]
pub struct Variant {
    id: usize,
    value: String,
    votes: u32,
    voted_users: Vec<AccountId>,
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    polls: UnorderedMap<usize, Poll>,
}

// Implement the contract structure
#[near_bindgen]
impl Contract {
    #[init]
    pub fn new_default() -> Self {
        Self {
            polls: UnorderedMap::new(b"polls".to_vec()),
        }
    }

    pub fn create_poll(&mut self, description: String, start_time: Option<String>, end_time: Option<String>, options: Vec<String>) -> Poll {
        let owner = env::signer_account_id();
        let mut poll_options = Vec::new();

        for (i, x) in options.iter().enumerate() {
            let option = Variant {
                id: i + 1,
                value: x.to_string(),
                votes: 0,
                voted_users: Vec::new(),
            };
            poll_options.push(option);
        }

        let mut poll_id = 1;
        let polls_len = self.polls.len();
        let vec_polls = self.polls.values_as_vector();

        if polls_len > 0 {
            poll_id = vec_polls.get(polls_len - 1).unwrap().id + 1;
        }

        let poll = Poll {
            id: poll_id,
            owner,
            description,
            start_time,
            end_time,
            options: poll_options,
        };

        self.polls.insert(&poll.id, &poll);
        poll
    }

    pub fn get_poll(&self, poll_id: usize) -> Option<Poll> {
        return self.polls.get(&poll_id);
    }

    pub fn delete_poll(&mut self, poll_id: usize) {
        let poll = self.polls
            .get(&poll_id)
            .expect("Such poll does not exists");

        let account_id = env::signer_account_id();
        assert_eq!(account_id, poll.owner, "Only owner can delete the poll!");

        self.polls
            .remove(&poll_id);
    }

    pub fn get_polls_for_owner(&self, account_id: AccountId, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
            .rev()
            .filter(|(_poll_id, poll)| poll.owner == account_id)
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
    }

    pub fn get_voted_polls(&self, account_id: AccountId, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
            .rev()
            .filter(|(_poll_id, poll)| poll.options.iter().any(|v| v.voted_users.contains(&account_id)))
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
    }

    pub fn get_all_polls(&self, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
            .rev()
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
    }


    pub fn vote(&mut self, poll_id: usize, variant_id: usize) {
        let poll = &mut self.polls
            .get(&poll_id)
            .expect("Such poll does not exists");
        let voter = env::signer_account_id();

        let start_time = DateTime::parse_from_rfc3339(&poll.start_time.as_ref().unwrap()).unwrap();
        let end_time = DateTime::parse_from_rfc3339(&poll.end_time.as_ref().unwrap()).unwrap();
        let date_now = chrono::offset::Utc::now();

        assert_eq!(date_now < start_time, false, "Voting has not started yet");
        assert_eq!(date_now > end_time, false, "Voting has ended");

        assert_eq!(poll.options.iter().any(|v| v.voted_users.contains(&voter)), false, "This user has already voted!");

        let option = poll.options.iter_mut().find(|v| v.id == variant_id).unwrap();

        option.voted_users.push(voter);
        option.votes = option.votes + 1;

        self.polls.insert(&poll_id, &poll);
    }

    pub fn is_voted(&self, account_id: AccountId, poll_id: usize) -> bool {
        let poll = self.polls
            .get(&poll_id)
            .expect("Such poll does not exists");

        poll.options.iter().any(|v| v.voted_users.contains(&account_id))
    }
}

/*
 * The rest of this file holds the inline tests for the code above
 * Learn more about Rust tests: https://doc.rust-lang.org/book/ch11-01-writing-tests.html
 */
#[cfg(test)]
mod tests {
    use near_sdk::test_utils::{accounts, VMContextBuilder};
    use near_sdk::{testing_env};

    use super::*;

    fn get_context(predecessor_account_id: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder
            .current_account_id(accounts(0))
            .signer_account_id(predecessor_account_id.clone())
            .predecessor_account_id(predecessor_account_id);
        builder
    }


    #[test]
    fn test_create_poll() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "20223-09-11T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options,
        );

        assert_eq!(created_poll.id, 1);
        assert_eq!(created_poll.description, description);
        assert_eq!(created_poll.start_time, Option::from(start_time.to_string()));
        assert_eq!(created_poll.end_time, Option::from(end_time.to_string()));
        assert_eq!(created_poll.owner, accounts(1));
    }

    #[test]
    fn test_get_poll() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-18T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options,
        );

        let poll = contract.get_poll(1).unwrap();

        assert_eq!(poll.id, 1);
        assert_eq!(poll.description, description);
        assert_eq!(poll.start_time, Option::from(start_time.to_string()));
        assert_eq!(poll.end_time, Option::from(end_time.to_string()));
        assert_eq!(poll.owner, accounts(1));
    }

    #[test]
    fn test_delete_poll() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options,
        );

        contract.delete_poll(1);

        assert_eq!(contract.polls.len(), 0);
    }

    #[test]
    #[should_panic(expected = "Only owner can delete the poll!")]
    fn test_delete_poll_not_owned() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options,
        );

        let context = get_context(accounts(0));
        testing_env!(context.build());

        contract.delete_poll(1);
        assert_eq!(contract.polls.len(), 1);
    }

    #[test]
    fn test_get_polls_for_owner() {
        let context_1 = get_context(accounts(1));
        testing_env!(context_1.build());

        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-21T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        let context_2 = get_context(accounts(1));
        testing_env!(context_2.build());

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        assert_eq!(contract.get_polls_for_owner(accounts(1), None, None).len(), 3);
        assert_eq!(contract.get_polls_for_owner(accounts(1), Option::from(0), Option::from(1)).len(), 1);
        assert_eq!(contract.get_polls_for_owner(accounts(1), Option::from(1), Option::from(3)).len(), 2);
        assert_eq!(contract.get_polls_for_owner(accounts(2), None, None).len(), 0);
    }

    #[test]
    fn test_get_all_polls() {
        let context_1 = get_context(accounts(1));
        testing_env!(context_1.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        let context_2 = get_context(accounts(1));
        testing_env!(context_2.build());

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        assert_eq!(contract.get_all_polls(None, None).len(), 3);
        assert_eq!(contract.get_all_polls(Option::from(0), Option::from(1)).len(), 1);
        assert_eq!(contract.get_all_polls(Option::from(1), Option::from(3)).len(), 2);
    }

    #[test]
    fn test_vote() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2029-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll.id, created_poll.options.first().unwrap().id);

        let poll = contract.polls.get(&created_poll.id).unwrap();

        let option = poll.options.iter().find(|v| v.id == poll.options.first().unwrap().id).unwrap();

        assert_eq!(option.voted_users.contains(&accounts(1)), true);
        assert_eq!(option.votes, 1);
    }

    #[test]
    #[should_panic(expected = "Voting has ended")]
    fn test_vote_ended_poll() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2022-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll.id, created_poll.options.first().unwrap().id);
    }

    #[test]
    #[should_panic(expected = "Voting has not started yet")]
    fn test_vote_not_started_poll() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2023-09-11T21:00:00.000Z";
        let end_time = "2023-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll.id, created_poll.options.first().unwrap().id);
    }

    #[test]
    #[should_panic(expected = "This user has already voted!")]
    fn test_vote_again() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-18T21:00:00.000Z";
        let end_time = "2025-09-21T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll.id, created_poll.options.first().unwrap().id);
        contract.vote(created_poll.id, created_poll.options.last().unwrap().id);
    }

    #[test]
    fn test_is_voted() {
        let context = get_context(accounts(1));
        testing_env!(context.build());
        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2024-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll.id, created_poll.options.first().unwrap().id);

        assert_eq!(contract.is_voted(accounts(1), created_poll.id), true);
    }

    #[test]
    fn test_get_voted_polls() {
        let context_1 = get_context(accounts(1));
        testing_env!(context_1.build());

        let mut contract = Contract::new_default();

        let description = "Best programming language!";
        let start_time = "2022-09-11T21:00:00.000Z";
        let end_time = "2029-09-19T21:00:00.000Z";
        let options = Vec::from(["Java".to_string(), "Rust".to_string(), "C++".to_string()]);

        let created_poll_1 = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        let context_2 = get_context(accounts(0));
        testing_env!(context_2.build());

        let created_poll_2 = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        let created_poll_3 = contract.create_poll(
            description.to_string(),
            Option::from(start_time.to_string()),
            Option::from(end_time.to_string()),
            options.clone(),
        );

        contract.vote(created_poll_1.id, created_poll_1.options.first().unwrap().id);
        contract.vote(created_poll_2.id, created_poll_2.options.first().unwrap().id);
        contract.vote(created_poll_3.id, created_poll_2.options.last().unwrap().id);

        assert_eq!(contract.get_voted_polls(accounts(0), None, None).len(), 3);
        assert_eq!(contract.get_voted_polls(accounts(0), Option::from(0), Option::from(1)).len(), 1);
        assert_eq!(contract.get_voted_polls(accounts(0), Option::from(1), Option::from(3)).len(), 2);
        assert_eq!(contract.get_voted_polls(accounts(1), None, None).len(), 0);
    }


}
