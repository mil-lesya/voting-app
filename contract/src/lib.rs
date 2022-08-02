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
            .filter(|(_poll_id, poll)| poll.owner == account_id)
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
    }

    pub fn get_voted_polls(&self, account_id: AccountId, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
            .filter(|(_poll_id, poll)| poll.options.iter().any(|v| v.voted_users.contains(&account_id)))
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
    }

    pub fn get_all_polls(&self, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
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

        for option in poll.options.iter() {
            assert_eq!(option.voted_users.contains(&voter), false, "This user has already voted!");
        }

        let option = poll.options.iter_mut().find(|v| v.id == variant_id).unwrap();

        option.voted_users.push(voter);
        option.votes = option.votes + 1;

        self.polls.insert(&poll_id, &poll);
    }

    pub fn is_voted(&self,  account_id: AccountId, poll_id: usize) -> bool {
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
    use super::*;

    #[test]
    fn test_create_poll() {
        let mut contract = Contract::default();
        assert_eq!(
            contract.create_poll("Best programming language!".to_string(), "1656874039533".to_string(), "1656874072974".to_string(), ["Java".to_string(), "Rust".to_string(), "C++".to_string()]),
            1
        );
        assert_eq!(contract.polls.get(&0).description.unwrap(), "Best programming language!")
    }
}
