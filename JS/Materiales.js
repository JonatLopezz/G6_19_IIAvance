var UrlMateriales = ' http://52.152.236.67:90/G6_19/controller/materiales.php?op=GetMateriales';
var UrlPostMateriales = ' http://52.152.236.67:90/G6_19/controller/materiales.php?op=InsertMaterial';
var UrlGetMaterial = 'http://52.152.236.67:90/G6_19/controller/materiales.php?op=GetMaterial';
var UrlPutMaterial = 'http://52.152.236.67:90/G6_19/controller/materiales.php?op=UpdateMaterial';
var UrlDeleteMaterial = 'http://52.152.236.67:90/G6_19/controller/materiales.php?op=EliminarMaterial';

$(document).ready(function(){
CargarMateriales();
});

function CargarMateriales(){
    $.ajax({
        url:UrlMateriales,
        type:'GET',
        datatype: 'JSON',
        success:function(response){
            var MiItems = response;
            var Valores = ''

            for(i = 0; i < MiItems.length; i++ ){

                Valores +=   '<tr>' + 
                    '<td>'+ MiItems[i].ID +'</td>'+
                    '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                    '<td>'+ MiItems[i].UNIDAD +'</td>'+
                    '<td>'+ MiItems[i].COSTO +'</td>'+
                    '<td>'+ MiItems[i].PRECIO +'</td>'+
                    '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                    '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                    '<td>'+ MiItems[i].ESTADO +'</td>'+
                    '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                    '<td>'+ 
                    '<button class="btn btn-info" onclick="CargarMaterial('+ MiItems[i].ID +')">Editar</button>'+
                    '<button class="btn btn-danger" onclick="EliminarMaterial('+ MiItems[i].ID +')">Eliminar</button>'+
                    '</td>'+
                '</tr>';

                
                $('.Materiales').html(Valores);
            }
        }
    });
}


function AgregarMaterial(){

    var datosMaterial = {
        ID:$('#ID').val(),
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };

    var datosMaterialesJson = JSON.stringify(datosMaterial);

    $.ajax({
        url:UrlPostMateriales,
        type:'POST',
        data:datosMaterialesJson,
        datatype:'JSON',
        contenttype: 'application/json',
        success: function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al crear material');
        }
    });
    alert('Material agregado');
}

function CargarMaterial(idMaterial){
    var datosMaterial={
        ID: idMaterial
    };
    var datosMaterialesJson=JSON.stringify(datosMaterial);
    
    $.ajax({
        url:UrlGetMaterial,
        type: 'POST',
        data:datosMaterialesJson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID').val(MiItems[0].ID);
            $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
            $('#UNIDAD').val(MiItems[0].UNIDAD);
            $('#COSTO').val(MiItems[0].COSTO);
            $('#PRECIO').val(MiItems[0].PRECIO);
            $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
            $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);

            var btnActualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarMaterial(' + MiItems[0].ID +')" '+
           'value="Actualizar Material" class="btn btn-primary"></input>';
            $('#idbntMaterial').html(btnActualizar);
        }
    });
}

function ActualizarMaterial(idMaterial){
    var datosMaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ID:$('#ID').val()
    };

    var datosMaterialesJson=JSON.stringify(datosMaterial);
    
    alert(datosMaterialesJson);
    $.ajax({
        url: UrlPutMaterial,
        type:'PUT',
        data:datosMaterialesJson,
        dataType:'JSON',
        contenttype:'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al actualizar material');
        }  
    });

    alert('Material actualizado');
}

function EliminarMaterial(idMaterial){
    var datosMaterial={
        ID: idMaterial
    };
    var datosMaterialesJson=JSON.stringify(datosMaterial);
    alert(datosMaterialesJson);
    $.ajax({
        url:UrlDeleteMaterial,
        type: 'DELETE',
        data:datosMaterialesJson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            console.log(response);
        },
        error:function(){
            alert('Error al eliminar material');
        }  
    });
    alert('Material eliminado');
}