/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{AccountId, env, near_bindgen, PanicOnDefault};
use near_sdk::collections::{UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, BorshDeserialize, BorshSerialize, Debug)]
pub struct Poll {
    id: usize,
    owner: AccountId,
    description: String,
    start_time: String,
    end_time: String,
    options: Vec<Variant>,
}

#[derive(Deserialize, Serialize, BorshDeserialize, BorshSerialize, Debug)]
pub struct Variant {
    id: usize,
    value: String,
    votes: u32,
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    polls: UnorderedMap<usize, Poll>
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

    pub fn create_poll(&mut self, description: String, start_time: String, end_time: String, options: [String; 3]) -> usize {
        let owner = env::signer_account_id();
        let mut poll_options = Vec::new();

        for (i, x) in options.iter().enumerate() {
            let option = Variant {
                id: i + 1,
                value: x.to_string(),
                votes: 0
            };
            poll_options.push(option);
        }

        let poll = Poll {
            id: (self.polls.len() + 1) as usize,
            owner,
            description,
            start_time: start_time.to_string(),
            end_time: end_time.to_string(),
            options: poll_options,
        };

        self.polls.insert(&poll.id, &poll);
        poll.id
    }

    pub fn get_poll(&self, poll_id: usize) -> Option<Poll> {
        return self.polls.get(&poll_id);
    }


    pub fn get_polls_for_owner(&self, account_id: AccountId) -> Vec<Poll> {
        let all_polls = self.polls.values_as_vector().to_vec();
        let mut account_polls = Vec::<Poll>::new();

        for poll in all_polls {
            if poll.owner == account_id {
                account_polls.push(poll);
            }
        }

        account_polls
    }

    pub fn get_all_polls(&self, from_index: Option<u64>, limit: Option<u64>) -> Vec<Poll> {
        self.polls
            .iter()
            .skip(from_index.unwrap_or(0) as usize)
            .take(limit.unwrap_or(10) as usize)
            .map(|(poll_id, _poll)| self.polls.get(&poll_id).unwrap())
            .collect()
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
