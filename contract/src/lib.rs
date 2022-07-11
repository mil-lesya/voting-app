/*
 * Example smart contract written in RUST
 *
 * Learn more about writing NEAR smart contracts with Rust:
 * https://near-docs.io/develop/Contract
 *
 */

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{AccountId, env, log, near_bindgen};
use near_sdk::collections::{UnorderedMap};
use near_sdk::serde::{Deserialize, Serialize};

// #[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Poll {
    id: usize,
    owner: AccountId,
    description: String,
    start_time: String,
    end_time: String,
    options: UnorderedMap<usize, Option>,
}

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub struct Option {
    id: usize,
    value: String,
    votes: u32,
}

// Define the contract structure
#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    polls: UnorderedMap<usize, Poll>,

}

impl Default for Contract {
    fn default() -> Self {
        Self {
            polls: UnorderedMap::new(b"polls".to_vec()),
        }
    }
}
// Implement the contract structure
#[near_bindgen]
impl Contract {
    pub fn create_poll(&mut self, description: String, start_time: String, end_time: String, options: [String; 3]) -> usize {
        let owner = env::signer_account_id();
        let mut map_options = UnorderedMap::new(b"options".to_vec());
        for (i, x) in options.iter().enumerate() {
            let option= Option {
                id: i + 1,
                value: x.to_string(),
                votes: 0
            };
            map_options.insert(&option.id, &option);
        }
        let poll = Poll{
            id: (self.polls.len() + 1) as usize,
            owner,
            description,
            start_time: start_time.to_string(),
            end_time: end_time.to_string(),
            options: map_options,
        };

        self.polls.insert(&poll.id, &poll);
        poll.id
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
    fn create_poll() {
        let mut contract = Contract::default();
        assert_eq!(
            contract.create_poll("Best programming language!".to_string(), "1656874039533".to_string(), "1656874072974".to_string(), ["Java".to_string(), "Rust".to_string(), "C++".to_string()]),
            1
        );
        assert_eq!(contract.polls.get(&0).description.unwrap(), "Best programming language!")
    }



}
