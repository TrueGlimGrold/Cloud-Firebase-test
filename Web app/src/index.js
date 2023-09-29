import { initializeApp } from 'firebase/app';
import { getFirestore, 
    doc, 
    setDoc,
    collection,
    getDocs
} from 'firebase/firestore/lite'; // I used firebase lite because it runs faster than the main firebase

// get information for the app.
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDnzD7AwGnVnKIJmKwDTGnGcGOLR4Parzw",
    authDomain: "remind-22d71.firebaseapp.com",
    projectId: "remind-22d71",
    storageBucket: "remind-22d71.appspot.com",
    messagingSenderId: "466519446203",
    appId: "1:466519446203:web:665ac17b01951147688f9e",
    measurementId: "G-T51TY1PC25"
});

// declair variables 

const firestore = getFirestore();
let colRef = collection(firestore, "data");

let quit = false; 
let answer = 0;
let name = "none";
let docData = {
    Habits: {

    },
    Goals: {

    }, 
    Daylies: {

    }, 
    Weeklies: {

    },
    Monthlies: {

    }
};

const reminder_data = doc(firestore, "data/current");

// functions
async function changeData(category, name) {
    // Retrieve all documents in the collection
    const querySnapshot = await getDocs(colRef);

    const updates = querySnapshot.docs.map(async (docSnapshot) => {
        const data = docSnapshot.data();
        if (category === "Habit") {
            // Increment times_completed for Habit if it exists
            if (data.Habits && data.Habits[name]) {
                data.Habits[name].times_completed += 1;
            }
        } else if (category === "Goal") {
            // Delete Goal if it exists
            if (data.Goals && data.Goals[name]) {
                delete data.Goals[name];
            }
        } else if (category === "Daily" || category === "Weekly" || category === "Monthly") {
            // Set completed to true for Daily, Weekly, or Monthly if it exists
            if (data[category] && data[category][name]) {
                data[category][name].completed = true;
            }
        }

        // Update the document with the modified data
        await setDoc(doc(firestore, "data", docSnapshot.id), data);
    });

    // Wait for all updates to complete
    await Promise.all(updates);
}

// This is a multipurpose function that will change data, dependant on what part of the Json file we are editing.
function addData (category, name) {
    if (category == "Habit") {
        docData = {
            Habits: {
                [name]: {
                    name: name, 
                    times_completed: 0,
                }
            },
        }
    } else if (category == "Goal") {
        docData = {
            Goals: {
                [name]: {
                    name: name, 
                }
            },
        }
    } else if (category == "Daily") {
        docData = {
            Daylies: {
                [name]: {
                    name: name, 
                    completed: false,
                }
            },
        }
    } else if (category == "Weekly") {
        docData = {
            Weeklies: {
                [name]: {
                    name: name, 
                    completed: false,
                }
            },
        }
    } else if (category == "Monthly") {
        docData = {
            Monthlies: {
                [name]: {
                    name: name, 
                    completed: false,
                }
            },
        }
    }
    setDoc(reminder_data, docData, { merge: true });
}

// start main code
alert('This is a test');


do {

    let colRef = collection(firestore, "data"); //I am putting this here to constanly refresh

// get user input
    answer = prompt("1) Add task\n2) Show tasks\n3) Complete task\n4) Quit\nEnter a number: ");
    if (answer == 1)
    {   
        // * add task
        answer = prompt("1) Habit\n2) Goal\n3) Daily\n4) Weekly\n5) Monthly\nPick a task to add: ")
        if (answer == 1) {
            name = prompt("What is the name of the Habit?: ")
            addData("Habit", name)
        } else if (answer == 2) {
            name = prompt("What is the name of the Goal?: ")
            addData("Goal", name)
        } else if (answer == 3) {
            name = prompt("What is the name of the Daily?: ")
            addData("Daily", name)
        } else if (answer == 4) {
            name = prompt("What is the name of the Weekly?: ")
            addData("Weekly", name)
        } else if (answer == 5) {
            name = prompt("What is the name of the Monthly?: ")
            addData("Monthly", name)
        } else {
            alert(' --- Invalid input ---');
        }
    } else if (answer == 2) {
        // * show tasks
        
        await fetchData();

        async function fetchData() {
        try {
            const snapshot = await getDocs(colRef);

            // These will be populated with information useful to Firestore

            let habits = {};
            let goals = {};
            let daylies = {};
            let weeklies = {};
            let monthlies = {};



            snapshot.docs.forEach((doc) => {
            const data = doc.data();
            const habitsData = data.Habits; // Access "Habits" object from Firestore data
            const goalsData = data.Goals; // Access "Goals" object from Firestore data
            const dayliesData = data.Daylies; // Access "Daylies" object from Firestore data
            const weekliesData = data.Weeklies; // Access "Weeklies" object from Firestore data 
            const monthliesData = data.Monthlies; // Access "Monthlies" object from Firestore data

            if (habitsData) {
                for (const habitName in habitsData) {
                const habit = habitsData[habitName];
                const habitCount = habit.times_completed;

                if (habits.hasOwnProperty(habitName)) {
                    habits[habitName] += habitCount;
                } else {
                    habits[habitName] = habitCount;
                }
                }
            }

            if (goalsData) {
                for (const goalName in goalsData) {
                    goals[goalName] = goalName;
                }
            }

            if (dayliesData) {
                for (const dayliesName in dayliesData) {
                    const taskData = dayliesData[dayliesName]; // Get the task data for the current task
                    const taskCompleted = taskData.completed; // Access the 'completed' property of the task data
        
                     daylies[dayliesName] = taskCompleted; // Assign the 'completed' value to the task name in the 'daylies' object
                }
            }

            if (weekliesData) {
                for (const weekliesName in weekliesData) {
                    const taskData = weekliesData[weekliesName]; // Get the task data for the current task
                    const taskCompleted = taskData.completed; // Access the 'completed' property of the task data
        
                    weeklies[weekliesName] = taskCompleted; // Assign the 'completed' value to the task name in the 'weeklies' object
                }
            }

            if (monthliesData) {
                for (const monthliesName in monthliesData) {
                    const taskData = monthliesData[monthliesName]; // Get the task data for the current task
                    const taskCompleted = taskData.completed; // Access the 'completed' property of the task data
                
                    monthlies[monthliesName] = taskCompleted; // Assign the 'completed' value to the task name in the 'monthlies' object
                }
            }

            });

            let tasksMessage = "Habits:\n";
            for (const habitName in habits) {
            tasksMessage += `- ${habitName}: ${habits[habitName]}\n`;
            }

            tasksMessage += "\nGoals:\n";

            for (const goalName in goals) {
                tasksMessage += `- ${goalName}\n`
            }

            tasksMessage += "\nDaylies:\n"

            for (const dayliesName in daylies) {
                tasksMessage += `- ${dayliesName}: ${daylies[dayliesName]}\n`
            }

            tasksMessage += "\nWeeklies:\n"

            for (const weekliesName in weeklies) {
                tasksMessage += `- ${weekliesName}: ${weeklies[weekliesName]}\n`
            }

            tasksMessage += "\nMonthlies:\n"

            for (const monthliesName in monthlies) {
                tasksMessage += `- ${monthliesName}: ${monthlies[monthliesName]}\n`
            }

            alert(tasksMessage)
            } catch(error) {
            console.error("Error fetching data: ", error);
        };
        }
    } else if (answer == 3) {
        // * complete task
        answer = prompt("1) Habit\n2) Goal\n3) Daily\n4) Weekly\n5) Monthly\nPick a task type to complete: ")

        if (answer == 1) {
            answer = prompt("What is the name of the task?: ")
            changeData("Habit", answer)
        } else if (answer == 2) {
            answer = prompt("What is the name of the task?: ")
            changeData("Goal", answer)
        } else if (answer == 3) {
            answer = prompt("What is the name of the task?: ")
            changeData("Daily", answer)
        } else if (answer == 4) {
            answer = prompt("What is the name of the task?: ")
            changeData("Weekly", answer)
        } else if (answer == 5) {
            answer = prompt("What is the name of the task?: ")
            changeData("Monthly", answer)
        } else {
            alert(" --- Invalid input ---")
        }

    } else if (answer == 4) {
        // * quit
        quit = true;
        alert('Goodbye!');
    } else {
        alert(' --- Invalid input ---');
    }
    
} while (quit == false);