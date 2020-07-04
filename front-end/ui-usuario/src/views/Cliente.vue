<template>
    <div class="container">
                <table class="table" v-if="!editar">
                    <thead>
                        <tr>
                        
                      
                        <th scope="col">Nombre </th>
                        <th scope="col">Apellidos </th>
                        <th scope="col">Telefono </th>
                        <th scope="col">Codigo Postal </th>
                        <th scope="col">Paìs </th>
                        <th scope="col">Provincia </th>
                        <th scope="col">Canton </th>
                        <th scope="col">Distrito </th>
                        <th scope="col">Direccion </th>

                       

                <!--         <th scope="col">Direccion</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Acciones</th> -->
                        
                        
                        </tr>
                    </thead>
                    <tbody>
            <tr v-for="(item, index) in cliente" :key="index">
            
            <td>{{item.nombre}}</td>
            <td>{{item.apellido}}</td>
            <td>{{item.codigopostal}}</td>
            <td>{{item.pais}}</td>
            <td>{{item.provincia}}</td>
            <td>{{item.canton}}</td>
            <td>{{item.distrito}}</td>
            <td>{{item.direccionexacta}}</td>


          <!--   <td>{{item.cedula}}</td>
            <td>{{item.nombre_Real}}</td>
            <td>{{item.direccion}}</td>
            <td>{{item.foto}}</td> -->
          <!--   <td> <b-button @click="eliminarCategoria(item.id_Categoria)" class="btn-danger btn-sm" >Eliminar</b-button></td>
             <td> <b-button @click="activarEdicion(item.id_Categoria)" class="btn-warning btn-sm" >Editar</b-button></td> -->
            </tr>
            
        </tbody>
 </table>


                        <!--  <form v-if="editar">
                    <h3>Editar</h3>

                    <input type="text" class="form-control my-2" placeholder="Password" v-model="usuarioEditar.passw">
                    <input type="text" class="form-control my-2" placeholder="Nombre de usuario" v-model="usuarioEditar.nombre_Usuario">
                    <input type="text" class="form-control my-2" placeholder="Tipo de usuario" v-model="usuarioEditar.tipo">
                    <input type="text" class="form-control my-2" placeholder="Cedula" v-model="usuarioEditar.cedula">
                    <input type="text" class="form-control my-2" placeholder="Nombre real" v-model="usuarioEditar.nombreR">
                    <input type="text" class="form-control my-2" placeholder="Direcciòn" v-model="usuarioEditar.dir">
                    <input type="text" class="form-control my-2" placeholder="Foto" v-model="usuarioEditar.foto">
                    <b-button class="btn-warning my-2" type="submit" v-onclick="">Editar</b-button>
                    <br>
                    <b-button class=" my-2 " type="submit" v-on:click="editar=false">Cancelar</b-button>

                </form>  -->
               <!--  <form v-if="!editar" >
                    <h3>Agregar</h3>

                    <input type="text" class="form-control my-2" placeholder="Password" v-model="user.password">
                    <input type="text" class="form-control my-2" placeholder="Nombre de usuario" v-model="user.nombreUs">
                    <input type="text" class="form-control my-2" placeholder="Tipo de usuario" v-model="user.tipo">
                    <input type="text" class="form-control my-2" placeholder="Cedula" v-model="user.cedula">
                    <input type="text" class="form-control my-2" placeholder="Nombre real" v-model="user.nombreR">
                    <input type="text" class="form-control my-2" placeholder="Direcciòn" v-model="user.dir">
                    <input type="text" class="form-control my-2" placeholder="Foto" v-model="user.foto">
                    <b-button class="btn-success my-2" type="submit" v-on:click="agregarUsuario">Agregar</b-button>

                </form>
         -->
    </div>
        
   
    
</template>

<script>
export default {
    data(){
        return{
            cliente:[]


        }
    },
    created(){
        this.listarCategoria();
    },
    methods:{
        listarCategoria(){

            fetch('http://localhost:3000/listarClientes',{
                headers:{
                    'Content-Type':'application/json'
                }
            })
            .then(res=>res.json())
            .then(data=>{console.log(data)
            this.cliente=data})
            .catch(e=>{
                console.log(e.response);
            })
        }
    },
    mounted(){
        this.listarCategoria()
    }
    
}
</script>