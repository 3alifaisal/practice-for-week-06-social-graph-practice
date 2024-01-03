const { use } = require("chai");

// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(userName) {
    this.currentID++;


    this.users[this.currentID] =  { "id": this.currentID,
                                    "name": userName    }


    this.follows[this.currentID] = new Set();

    return this.currentID;
  }

  getUser(userID) {
    if(this.users.hasOwnProperty(userID)){
      return this.users[userID];
    }
    return null;
    }
 
  

  follow(userID1, userID2) {
    if(this.users.hasOwnProperty(userID1) && 
       this.users.hasOwnProperty(userID2)){

        this.follows[userID1].add(userID2);
        return true;
    }
    return false;
  }

  getFollows(userID) {
    if(this.follows.hasOwnProperty(userID)){
      return this.follows[userID];
    }
    return null;
  }

  getFollowers(userID) {
    if(this.follows.hasOwnProperty(userID)){
      let listOfFollowers = new Set()
      for( let user in this.follows){
        if(this.follows[user].has(userID)){
          listOfFollowers.add(Number(user))
        }
      }
      return listOfFollowers;
    }
    return null;
  }

  getRecommendedFollows(userID, degrees) {
    let queue = [[userID]];
    let visitedNodes = new Set();
    visitedNodes.add(userID);
    let recommendedUsers = [];

    while(queue.length > 0){
      
      let followsPath = queue.shift();
      let currUser = followsPath[followsPath.length -1];
     
      if (followsPath.length > 2 ) {
        if(followsPath.length -2 <= degrees){
          recommendedUsers.push(currUser)
        }
      }
      
      
      
      console.log(followsPath.length)
      let currUserfollows = this.getFollows(currUser);
      for(const following of currUserfollows){
        if(!visitedNodes.has(following)){
          visitedNodes.add(following);
          queue.push(followsPath.concat(following));
          
      }
      }
      
     
    }
    return recommendedUsers;
    
  }
}

const socialNetwork = new SocialNetwork();
const userID1 = socialNetwork.addUser("User 1");
const userID2 = socialNetwork.addUser("User 2");
const userID3 = socialNetwork.addUser("User 3");
const userID4 = socialNetwork.addUser("User 4");
const userID5 = socialNetwork.addUser("User 5");
const userID6 = socialNetwork.addUser("User 6");

socialNetwork.follow(1, 2);
socialNetwork.follow(2, 3);
socialNetwork.follow(3, 4);
socialNetwork.follow(3, 5);
socialNetwork.follow(4, 1);
socialNetwork.follow(4, 2);
socialNetwork.follow(5, 6);

console.log(socialNetwork.getRecommendedFollows(1, 1))
socialNetwork.getRecommendedFollows(1, 3)
console.log(socialNetwork.getRecommendedFollows(1, 2))
module.exports = SocialNetwork;