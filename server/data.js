const { faker } = require('@faker-js/faker');
const { v4: uuidv4 } = require("uuid");

const createUsersAndDreams = () => {
    
    const userArray = [];
    const allDreams = [];

    const dreamTypes = ["mundane", "lucid", "nightmare", "fantasy", "recurring", "prophetic", "epic", "abstract", "past-life", "intimate", "18+", "death", "time-travel", "unwordly", "horror", "religious", "after-life", "alien"]

    for (let i = 0; i < 20; i++){
        let userObj = {};
        if( i == 0){
            userObj._id = "fakeuser1@user.com"
        }else{
            userObj._id = faker.internet.email();
        }
        userObj.userData = {};
        userObj.userData.nickname = userObj._id.split("@")[0];
        userObj.userData.name = JSON.parse(JSON.stringify(userObj._id));
        userObj.userData.email = JSON.parse(JSON.stringify(userObj._id));
        userObj.userData.picture = faker.image.avatar();
        userObj.savedDreamsArr = [];
        let randomNum = Math.ceil((Math.random() * 5) + 5)
        for (let j = 0; j < randomNum; j++){
            let dreamObj = {};

            dreamObj.commentsArr = [];
            for(let com = 0; com < 4; com++){
                dreamObj.commentsArr.push({ userData: { nickname: faker.internet.userName() }, comment: faker.lorem.paragraph()})
            }
            dreamObj.viewerArr = new Array(Math.floor(Math.random() * 1000)).fill("") ;
            dreamObj.likesArr = new Array(Math.floor(Math.random() * (dreamObj.viewerArr.length/2))).fill("");
            dreamObj._id = uuidv4();
            dreamObj.date = faker.date.between('2020-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z');
            dreamObj.userId = JSON.parse(JSON.stringify(userObj._id)); 
            dreamObj.userData = JSON.parse(JSON.stringify(userObj.userData));

            dreamObj.dreamData = {};
            dreamObj.dreamData.storyData = {};
            dreamObj.dreamData.storyData.name = faker.lorem.words(3);
            dreamObj.dreamData.storyData.dream = [];
            for(let para = 0; para < 15; para++){
                dreamObj.dreamData.storyData.dream.push(faker.lorem.paragraph())
            }

            dreamObj.dreamData.charData = {};
            let randomNum2 = Math.ceil(Math.random() * 5 + 3)
            for (let x = 0; x < 6; x++){
                dreamObj.dreamData.charData[`char-${x}`] = {};
                dreamObj.dreamData.charData[`char-${x}`].name = faker.name.fullName();
                dreamObj.dreamData.charData[`char-${x}`].details = faker.lorem.sentences(3);
                // dreamObj.dreamData.charData[`char-${x}`].img = faker.image.animals(undefined, undefined, true);
                dreamObj.dreamData.charData[`char-${x}`].img = faker.image.avatar();
            }

            
            dreamObj.dreamData.finalData = {};
            dreamObj.dreamData.finalData.summary = faker.lorem.sentences(6);
            dreamObj.dreamData.finalData.meaning = faker.lorem.sentences(4);
            dreamObj.dreamData.finalData.checkedValues = [];
            for(let y = 0; y < 3; y++){
                dreamObj.dreamData.finalData.checkedValues.push(dreamTypes[Math.floor(Math.random() * dreamTypes.length)]);
            }
            dreamObj.dreamData.finalData.privacySetting = "public";

            allDreams.push(dreamObj)
        }
        userArray.push(userObj)
    }
    return {userArray, allDreams}
}   


module.exports = { createUsersAndDreams }
