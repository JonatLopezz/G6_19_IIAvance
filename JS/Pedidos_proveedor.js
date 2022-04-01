var UrlPedidos= 'http://localhost:90/G6_19/controller/pedidos_proveedor.php?op=GetPedidos';
var UrlPostPedidos='http://localhost:90/G6_19/controller/pedidos_proveedor.php?op=InsertPedido';
var UrlGetPedido='http://localhost:90/G6_19/controller/pedidos_proveedor.php?op=GetPedido';
var UrlPutPedidos='http://localhost:90/G6_19/controller/pedidos_proveedor.php?op=UpdatePedido';
var UrlDeletePedidos='http://localhost:90/G6_19/controller/pedidos_proveedor.php?op=DeletePedido';

$(document).ready(function(){
    CargarPedidos();
   
});

function CargarPedidos(){
    $.ajax({
        url:UrlPedidos,
        type: 'GET',
        datatype:'JSON',
        success: function(response){
            var MiItems = response;
            var Valores='';

            for( i=0; i<MiItems.length; i++){
               Valores += '<tr>' +
               '<td>'+ MiItems[i].ID +'</td> '+
               '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
               '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
               '<td>'+ MiItems[i].DETALLE +'</td>'+
               '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
               '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
               '<td>'+ MiItems[i].TOTAL +'</td>'+
               '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
               '<td>'+ MiItems[i].ESTADO +'</td>'+
              '<td>'+
               '<button class="btn btn-info" onclick="CargarPedidos('+ MiItems[i].ID +')">Editar</button>'+'</td>'+
               '<td>'+'<button class="btn btn-warning" onclick="EliminarPedidos('+ MiItems[i].ID +')">Eliminar</button>' +'<td>'
           '</tr>';
            $('.Pedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedidos={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()

    };
    var datospedidosjson=JSON.stringify(datospedidos);
    $.ajax({
        url: UrlPostPedidos,
        type:'post',
        data:datospedidosjson,
        dataType:'JSON',
        contenttype:'application/json',
        success:function(reponse){
             console.log(reponse);
        },
        error:function(){
            alert('Error al crear Pedido');
        }  
    });
    alert('Pedido Agregado');
}


function CargarPedido(idPedido){
    var datospedido={
        ID:idPedido
    };
    var datospedidojson=JSON.stringify(datospedido)
    alert(datospedidojson);
    $.ajax({
        url:UrlGetPedido,
        type: 'POST',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);
            var btnactualizar='<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID +')"'+
           'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('#idbtnpedido').html(btnactualizar);
        }
    });
}

function ActualizarPedido(idPedido){
    var datospedidos={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()

    };
    var datospedidosjson=JSON.stringify(datospedidos);
    $.ajax({
        url: UrlPutPedidos,
        type:'PUT',
        data:datospedidosjson,
        dataType:'JSON',
        contenttype:'application/json',
        success:function(reponse){
             console.log(reponse);
        },
        error:function(){
            alert('Error al actualizar Pedido');
        }  
    });
    alert('Pedido Actualizado');
}
