require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { unquirerMenuOptions, pausa, leerInput, confirmar, listarTareasAborrar, mostrartareasCheckLst } = require('./helpers/unquirer');
const Tareas = require('./models/tareas');


const main = async()=>{
    // mostrarMenu();
    // pausa();

    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();
    
    if( tareasDB )
    {
        console.log(tareasDB);
        tareas.cargarTareasFromArray (tareasDB );
    }

    do{
        opt = await unquirerMenuOptions();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;
            case '2':
                tareas.cargarTareas();
            break;
            case '3':
                tareas.cargarPendientesCompletadas();
            break;
            case '4':
                tareas.cargarPendientesCompletadas(false);
            break;
            case '5':
                const ids = await mostrartareasCheckLst(tareas.listadoArr);
                
                tareas.completarTarea(ids);
            break;
            case '6':
                const id = await listarTareasAborrar(tareas.listadoArr);

                if( id !== '0'){
                    const ok = await confirmar('¿Está seguro de borrar la tarea?');
                    if(ok){
                        tareas.borrarTarea( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB( tareas.listadoArr );


        console.log('\n');
        await pausa();



    }while(opt !== '0');
} 

main();
