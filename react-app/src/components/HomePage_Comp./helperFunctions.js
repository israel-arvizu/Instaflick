
function getRandomNumber(min, max){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

export function getRecommendedUsers(allUsers) {
    let min = allUsers.length - (allUsers.length - 1)
    let max = allUsers.length - 1
    let currSuggested = []
    let usedNumbers = []
    for(let i = 0; i < 5; i++){
      let randomNumber = getRandomNumber(min, max)
      if(usedNumbers.includes(randomNumber)){
        i = i - 1
      } else{
        usedNumbers.push(randomNumber)
        currSuggested[i] = allUsers[randomNumber]
      }
    }
    return currSuggested
}
