const unquirer = require('inquirer');

const preguntas = [{
    type:'list',
    name:'opcion',
    message:'Elige una opción',
    choices:[
        {
            value:'1',
            name:`${ '1.'.green } Crear tarea`
        },
        {
            value:'2',
            name:`${ '2.'.green} Listar tareas`
        },
        {
            value:'3',
            name:`${ '3.'.green } Listar tareas completadas`
        },
        {
            value:'4',
            name:`${ '4.'.green } Listar tareas pendientes`
        },
        {
            value:'5',
            name:`${'5.'.green} Completar tareas`
        },
        {
            value:'6',
            name:`${'5.'.green} Borrar tarea`
        },
        {
            value:'0',
            name:`${'0.'.green} Salir`
        }
    ]
}];


const unquirerMenuOptions = async()=> {
    
    console.clear();
    console.log('==============================='.green);
    console.log('   Seleccione una opción'.white);
    console.log('===============================\n'.green);
    
    const { opcion } = await unquirer.prompt(preguntas);
    
    return opcion;
    
}

const pausa = async()=> {

    const pregunta = [{
        type:'input',
        name:'enter',
        message:`Presione ${ 'enter'.green } para continuar`
    }];

    await unquirer.prompt(pregunta);
}

const confirmar = async( message ) => {
    
    const pregunta = [{
        type:'confirm',
        name:'ok',
        message
    }];

    const { ok } = await unquirer.prompt(pregunta);

    return ok;
}

const leerInput = async( message ) => {
    const pregunta = [{
        type:'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length === 0){
                return 'Por favor ingrese un valor';
            }
            return true;
        }
    }];

    const {desc} = await unquirer.prompt(pregunta);
    return desc;

}

const listarTareasAborrar = async( tareas = [] ) => {
        
    const choices = tareas.map( (el, i) =>{

        const idx = `${i + 1}`.green;

        return {
            name: `${idx} ${el.desc}`,
            value: el.id    
        } 
    });

    choices.unshift({
        name:'0.'.green + 'Cancelar',
        value: 0
    })
    
    const questions = [{
        type:'list',
        name: 'id',
        message: 'Elije la tarea a borrar',
        choices
    }];

    
    const { id } = await unquirer.prompt(questions);
    
    return id;

}


const mostrartareasCheckLst = async( tareas = [] ) => {
        
    const choices = tareas.map( (el, i) =>{

        const idx = `${i + 1}`.green;

        return {
            name: `${idx} ${el.desc}`,
            value: el.id ,
            checked: ( el.completadoEn ) ? true : false
        } 
    });
    
    const questions = [{
        type:'checkbox',
        name: 'ids',
        message: 'Elije la tarea a borrar',
        choices
    }];
    
    const { ids } = await unquirer.prompt(questions);
    
    return ids;

}



module.exports = {
    unquirerMenuOptions,
    pausa,
    leerInput,
    confirmar,
    listarTareasAborrar,
    mostrartareasCheckLst
}

