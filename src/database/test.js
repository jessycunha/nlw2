const Database = require('./db')
const createProffy = require('./createProffy')


Database.then(async (db) => {
    //Inserir dados
    proffyValue = {
        name: "Jessica Cunha", 
        avatar: "https://avatars3.githubusercontent.com/u/56206812?s=460&u=2986b2a209a7b91920e90230adff971870a2a110&v=4", 
        whatsapp: "16997288827", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonada por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões."
    }

    classValue = {
        subject: "1", 
        cost: "R$ 20,00"
        //o proffy virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados
        {
        weekday: 1, 
        time_from: 720, 
        time_to: 1220
        },
        {
        weekday: 0, 
        time_from: 520, 
        time_to: 1220
        }
    ]

    // await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //consultar os dados inseridos

    // todos os proffys
    const selectecProffys = await db.all("SELECT * FROM proffys")
    // console.log(selectecProffys)

    //consultar as classes dos proffys
    //trazer junto os dados do proffy
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    console.log(selectClassesAndProffys)

    // horario ex: 8h - 18h
    //time_from precisa ser antes ou igual
    //time_to precisa ser acima 
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = 1
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "520"
        AND class_schedule.time_to > "520"
        `)

    // console.log(selectClassesSchedules)
    
})