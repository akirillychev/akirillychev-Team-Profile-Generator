//ask questions
// create the team 
// write the html
//final tell the user where the html

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const team = [];
const addManager = () => {
    return inquirer.prompt([
        { 
            type: "input",
            message: "What is your full name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your employee ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your office number?",
            name: "officeNumber"
        }
    ]).then(response => {
        console.log(response);
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        team.push(manager);
        return generateTeam();
    })
}

const addEngineer = () => {
    return inquirer.prompt([
        { 
            type: "input",
            message: "What is your full name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your employee ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "number",
            message: "What is your GitHub username?",
            name: "username"
        }
    ]).then(response => {
        console.log(response);
        const engineer = new Engineer(response.name, response.id, response.email, response.username);
        team.push(engineer);
        return generateTeam();
    })
}

const addIntern = () => {
    return inquirer.prompt([
        { 
            type: "input",
            message: "What is your full name?",
            name: "name"
        },
        {
            type: "number",
            message: "What is your employee ID?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email"
        },
        {
            type: "input",
            message: "What school are you attending?",
            name: "school"
        }
    ]).then(response => {
        console.log(response);
        const intern = new Intern(response.name, response.id, response.email, response.school);
        team.push(intern);
        return generateTeam();
    })
}



let generateTeam = () => {
    return inquirer.prompt([
        {
            type: "list",
            message: "Please select which type of team member you would like to add",
            name: "member",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "No more employees to add"
            ]
        }
    ]).then(response => {
        switch(response.member){
            
            case "Manager":
                return addManager();

            case "Engineer":
                return addEngineer();

            case "Intern":
                return addIntern();

            case "No more employees to add":
                return createTeam();
        }
    })
}

function createTeam(){
    fs.writeFileSync(outputPath, render(team),"utf-8");
}

generateTeam();
