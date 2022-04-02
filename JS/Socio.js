var UrlSocios = 'http://localhost:90/G6_19/controller/socio_negocio.php?op=GetSocios';
var UrlPostSocio = 'http://localhost:90/G6_19/controller/socio_negocio.php?op=InsertSocio';
var UrlGetSocio = 'http://localhost:90/G6_19/controller/socio_negocio.php?op=GetSocio';
var UrlPutSocio = 'http://localhost:90/G6_19/controller/socio_negocio.php?op=UpdateSocio';
var UrlDeleteSocio = 'http://localhost:90/G6_19/controller/socio_negocio.php?op=DeleteSocio';

$(document).ready(function(){
CargarSocios();
});

function CargarSocios(){
    $.ajax({
        url: UrlSocios,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for(i=0; i < MiItems.length; i++){
                Valores +=  '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].NOMBRE +'</td>'+
                '<td>'+ MiItems[i].RAZON_SOCIAL +'</td>'+
                '<td>'+ MiItems[i].DIRECCION +'</td>'+
                '<td>'+ MiItems[i].TIPO_SOCIO +'</td>'+
                '<td>'+ MiItems[i].CONTACTO +'</td>'+
                '<td>'+ MiItems[i].EMAIL +'</td>'+
                '<td>'+ MiItems[i].FECHA_CREADO +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].TELEFONO +'</td>'+
                '<td>'+
                '<button class="btn btn-info" onclick="CargarSocio('+ MiItems[i].ID +')" >Editar</button>'+
                '</td>'+
                '<td>'+
                '<button class="btn btn-danger" onclick="EliminarSocio('+ MiItems[i].ID +')" >Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.Sociosnegocio').html(Valores);
            }
        }   
    });
}

function AgregarSocio(){
    var datossocio={
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlPostSocio,
        type: 'POST',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
         alert('Error al Crear Socio');
        }
    });
    alert('Socio Agregado');
}

function CargarSocio(idsocio){
    var datossocio = {
      ID: idsocio  
    };
    var datossociojson = JSON.stringify(datossocio);

    $.ajax({
        url: UrlGetSocio,
        type: 'POST',
        data: datossociojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);
            var btnactualizar =   '<input type="submit" id="btn_actualizar" onclick="ActualizarSocio('+ MiItems[0].ID +')"'+ 
            'value = "Actualizar Socio" class="btn btn-success"></input>';
            $('#btnsocio').html(btnactualizar);
        }
    });
    alert('Socio Cargado');
}

function ActualizarSocio(idsocio){
    var datossocio={
        ID: idsocio, 
        NOMBRE:$('#NOMBRE').val(),
        RAZON_SOCIAL:$('#RAZON_SOCIAL').val(),
        DIRECCION:$('#DIRECCION').val(),
        TIPO_SOCIO:$('#TIPO_SOCIO').val(),
        CONTACTO:$('#CONTACTO').val(),
        EMAIL:$('#EMAIL').val(),
        FECHA_CREADO:$('#FECHA_CREADO').val(),
        ESTADO:$('#ESTADO').val(),
        TELEFONO:$('#TELEFONO').val()
    };
    var datossociojson = JSON.stringify(datossocio);
    $.ajax({
        url: UrlPutSocio,
        type: 'PUT',
        data: datossociojson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error: function(){
         alert('Error al Actualizar Socio');
        }
    });
    alert('Socio Actualizado');
}

function EliminarSocio(idsocio){
    var datossocio = {
        ID: idsocio  
      };
      var datossociojson = JSON.stringify(datossocio);

    $.ajax({
    url: UrlDeleteSocio,
    type: 'DELETE',
    data: datossociojson,
    datatype: 'JSON',
    contenttype: 'application/json'
    });
    alert('Socio Eliminado');
}
