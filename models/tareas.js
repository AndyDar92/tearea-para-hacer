const Tarea = require('./tarea');

class Tareas {

    _listado = {};


    constructor(){
        this._listado = {};
    }

    get listadoArr(){    
        
        const listado = [];
        Object.keys(this._listado).forEach(key=>{
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach(tarea=>{
            this._listado[tarea.id] = tarea;
        });
    }

    crearTarea(desc){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareas() {
        if(this.listadoArr.length > 0){
            console.log('\n');
            this.listadoArr.forEach((el, i) => {
                // //1. Descripcion   | Completado (verde) , Pendiente (rojo)
                const numeracion = `${i+1}`.green;
                const estado = (el.completadoEn != null ?  'Completado'.green : 'Pendiente'.red);

                console.log( `${numeracion} ${el.desc} | ${estado}` );
            });
        }
    }

    cargarPendientesCompletadas( completada = true){
        if(this.listadoArr.length > 0){
            console.log('\n');
            this.listadoArr.filter(x=> 
                {
                    if(completada){
                        return x.completadoEn !== null;
                    }else{
                        return x.completadoEn === null;
                    }
                }).forEach((el, i) => {
                // //1. Descripcion   | Completado (verde) , Pendiente (rojo)
                const numeracion = `${i+1}`.green;
                const estado = (el.completadoEn != null ?  'Completado'.green : 'Pendiente'.red);

                console.log( `${numeracion} ${el.desc} | ${estado}` );
            });
        }
    }

    borrarTarea( id = ''){
        
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    completarTarea( ids = [] ){
        if(ids.length > 0){
            this.listadoArr.forEach( el => {
                el.completadoEn = ( ids.includes(el.id) ) ?  new Date() : null;
            });
        }
    }
}


module.exports = Tareas;