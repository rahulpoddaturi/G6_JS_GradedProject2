let jsonResumeObj;
const arr_Applied_for = [];
const arr_Applied_for_filtered = [];
let resumecode = " ";

const buttonPrevious = document.querySelector(".previousButton");
const searchbox = document.querySelector(".searchTextBox");
const buttonNext = document.querySelector(".nextButton");

buttonPrevious.addEventListener("click", buttonPreviousClicked);
buttonNext.addEventListener("click", buttonNextClicked);
searchbox.addEventListener("input", function () {
    setTimeout(searchString, 0);
});
let currIndex = 0;

/* direct loading of json gives CORS error in some browser */
let jsonUrl = "/Resources/database/data.json";

getText(jsonUrl);

async function getText(file) {
    let x = await fetch(file);
    let y = await x.text();
    jsonResumeObj = JSON.parse(y);
    if (jsonResumeObj.resume.length > 0) {
        for (let x in jsonResumeObj.resume) {
            arr_Applied_for[x] = jsonResumeObj.resume[x].basics.AppliedFor;
        }
        showdata();
    } else {
        buttonPrevious.style.visibility = 'hidden';
        buttonNext.style.visibility = 'hidden';
        Alert(" No resume avaialble");
    }
}
function showdata() {
    displayResume(0);
    buttonPrevious.style.visibility = 'hidden';
    buttonNext.style.visibility = 'visible';
}

function buttonNextClicked() {
    let max_Index = 0;
    let dis_Index = 0;
    
    if (searchbox.value.length == 0) {
        max_Index = jsonResumeObj.resume.length - 1;
        dis_Index = currIndex +1;
        currIndex++;
    } else if (arr_Applied_for_filtered.length > 0) {
        
        max_Index = arr_Applied_for_filtered.length - 1; 
        dis_Index = arr_Applied_for_filtered[currIndex+1];
        currIndex++;
    }
    if (currIndex <=max_Index) {
        displayResume(dis_Index);
        buttonPrevious.style.visibility = (currIndex == 0) ? 'hidden' : 'visible';
        buttonNext.style.visibility = (currIndex == max_Index) ? 'hidden' : 'visible';
    }
}

function buttonPreviousClicked() {

    let max_Index = 0;
    let dis_Index = 0;
    if (searchbox.value.length > 0) {
        max_Index = arr_Applied_for_filtered.length - 1;
        dis_Index = arr_Applied_for_filtered[currIndex - 1];
        currIndex--;
    }
    else {
        max_Index = jsonResumeObj.resume.length - 1;
        dis_Index = can_Index - 1;
        currIndex--;
    }

    if (currIndex >= 0) {
        displayResume(dis_Index);
        buttonPrevious.style.visibility = (currIndex == 0) ? 'hidden' : 'visible';
        buttonNext.style.visibility = (currIndex == max_Index) ? 'hidden' : 'visible';
    }
}
noProfileHtml = "<div class='noResumeSection'> <img src='/Resources/img/NoResume.jpg' alt='No Results'></div>"
resumecode = document.getElementById("resumeSection").innerHTML;
function searchString() {
    arr_Applied_for_filtered.length = 0;
    for (let x in arr_Applied_for) {
        if (arr_Applied_for[x].includes(searchbox.value)) {
            arr_Applied_for_filtered.push(x);
        }
    }
    if (arr_Applied_for_filtered.length > 0) {
        dis_Index = arr_Applied_for_filtered[0];
        displayResume(dis_Index);
        currIndex = 0;
        buttonNext.style.visibility = (arr_Applied_for_filtered.length == 1 )?'hidden':'visible'; // show the next button
        buttonPrevious.style.visibility = 'hidden'; // hide the previous button
    } else {
        buttonNext.style.visibility = 'hidden'; // hide the next button
        buttonPrevious.style.visibility = 'hidden'; // hide the previous button
        document.getElementById("resumeSection").innerHTML = noProfileHtml;

    }
}
function displayResume(i) {

    document.getElementById("resumeSection").innerHTML = resumecode
    const userNameTextValue = jsonResumeObj.resume[i].basics.name;
    document.getElementById("userName").innerHTML = userNameTextValue;

    const appliedForJobTextValue = jsonResumeObj.resume[i].basics.AppliedFor;
    document.getElementById("appliedForJob").innerHTML = 'Applied For : ' + appliedForJobTextValue;

    const jsonWorkExperienceInfo = jsonResumeObj.resume[i].work;
    let workExperienceTextValue = "<h3>Work Experience in Previous Company</h3><p><ul class='noBulletsList'>";
    for (let x in jsonWorkExperienceInfo) {
        workExperienceTextValue += "<li><b>" + x + ":</b> " + jsonWorkExperienceInfo[x] + "</li><br>";
    }
    let subStringToRemoveInWorkInfo = "<br>";
    workExperienceTextValue = workExperienceTextValue.substring(0, workExperienceTextValue.length - subStringToRemoveInWorkInfo.length);
    workExperienceTextValue += "</ul></p>";

    const jsonProjectsInfo = jsonResumeObj.resume[i].projects;
    let projectsTextValue = "<h3>Projects</h3>";
    projectsTextValue += "<p><ul class='noBulletsList'><li><b>" + jsonProjectsInfo["name"] + ": </b>" + jsonProjectsInfo["description"] + "</li></ul></p>";

    const jsonEducationInfo = jsonResumeObj.resume[i].education;
    let educationTextValue = "<h3>Education</h3><p><ul>";
    for (let x in jsonEducationInfo) {
        educationTextValue += "<li><b>" + x + ": </b>";
        for (let y in jsonEducationInfo[x]) {
            educationTextValue += jsonEducationInfo[x][y] + ",";
        }
        let subStringToRemoveInWorkInfo = ",";
        educationTextValue = educationTextValue.substring(0, educationTextValue.length - subStringToRemoveInWorkInfo.length);
        educationTextValue += "</li>";
    }
    educationTextValue += "</ul></p>";

    const jsonInternshipInfo = jsonResumeObj.resume[i].Internship;
    let internshipTextValue = "<h3>Internship</h3><p><ul>";
    for (let x in jsonInternshipInfo) {
        internshipTextValue += "<li><b>" + x + ": </b>" + jsonInternshipInfo[x] + "</li>";
    }
    internshipTextValue += "</ul></p>";

    const jsonAchievementsInfo = jsonResumeObj.resume[i].achievements.Summary;
    let achievementsTextValue = "<h3>Achievements</h3><p><ul>";
    for (let x in jsonAchievementsInfo) {
        achievementsTextValue += "<li>" + jsonAchievementsInfo[x] + "</li>";
    }
    achievementsTextValue += "</ul></p>";

    let bottomRightColumnContent = workExperienceTextValue + projectsTextValue + educationTextValue + internshipTextValue + achievementsTextValue;
    document.getElementById("bottomRightColumnContent").innerHTML = bottomRightColumnContent;

    const mobileNumberTextValue = jsonResumeObj.resume[i].basics.phone;
    document.getElementById("mobileNumber").innerHTML = mobileNumberTextValue;

    const emailIdTextValue = jsonResumeObj.resume[i].basics.email;
    document.getElementById("emailId").innerHTML = emailIdTextValue;

    const networkTextValue = jsonResumeObj.resume[i].basics.profiles.network;
    const hrefUrlTextValue = jsonResumeObj.resume[i].basics.profiles.url;
    var linkedIn = document.getElementById("linkedIn");
    linkedIn.innerHTML = networkTextValue;
    linkedIn.setAttribute('href', hrefUrlTextValue);

    const jsonSkillsList = jsonResumeObj.resume[i].skills.keywords;
    let technicalSkillsTextValue = "";
    for (let x in jsonSkillsList) {
        technicalSkillsTextValue += "<tr><td>" + jsonSkillsList[x] + "</td></tr>";
    }
    document.getElementById("technicalSkillsTableBody").innerHTML = technicalSkillsTextValue;

    const jsonHobbiesList = jsonResumeObj.resume[i].interests.hobbies;
    let hobbiesTextValue = "";
    for (let x in jsonHobbiesList) {
        hobbiesTextValue += "<tr><td>" + jsonHobbiesList[x] + "</td></tr>";
    }
    document.getElementById("hobbiesTableBody").innerHTML = hobbiesTextValue;
}