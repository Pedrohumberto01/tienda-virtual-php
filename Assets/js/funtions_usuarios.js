
document.addEventListener('DOMContentLoaded',function(){

	tableUsuarios = $('#tableUsuarios').dataTable( {
        "aProcessing":true,
        "aServerSide":true,
        "language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json"
        },
        "ajax":{
            "url": " "+base_url+"/Usuarios/getUsuarios",
            "dataSrc":""
        },
        "columns":[
            {"data":"idpersona"},
            {"data":"nombres"},
            {"data":"apellidos"},
            {"data":"email_user"},
            {"data":"nombrerol"},
            {"data":"status"},
            {"data":"options"}
        ],
        'dom': 'lBfrtip',
	    buttons: [
	        {
	        	"extend": "copyHtml5",
	        	"text": "<i class='far fa-copy'></i> Copiar",
	        	"titleAttr": "Copiar",
	        	"className": "btn btn-secondary"
	        },
	        {
	        	"extend": "pdfHtml5",
	        	"text": "<i class='fas fa-file-pdf'></i> PDF",
	        	"titleAttr": "PDF",
	        	"className": "btn btn-danger"
	        },
	        {
	        	"extend": "excelHtml5",
	        	"text": "<i class='fas fa-file-excel'></i> Excel",
	        	"titleAttr": "Excel",
	        	"className": "btn btn-warning"
	        }
	    ],
        "resonsieve":"true",
        "bDestroy": true,
        "iDisplayLength": 10,
        "order":[[0,"desc"]]  
    });

	var formUsuario = document.querySelector('#formUsuario');
	formUsuario.onsubmit = function(e){
		e.preventDefault();
		var strIdentificacion = document.querySelector('#txtIdentificacion').value;
		var strNombre = document.querySelector('#txtNombre').value;
		var strApellido = document.querySelector('#txtApellido').value;
		var strEmail = document.querySelector('#txtEmail').value;
		var intTelefono = document.querySelector('#txtTelefono').value;
		var intTipousuario = document.querySelector('#listRolid').value;
		var intStatus = document.querySelector('#listStatus').value;
		var strPassword = document.querySelector('#txtPassword').value;

		if(strIdentificacion == '' || strNombre == '' || strApellido == '' || strEmail == '' || intTelefono == '' || intTipousuario == '')
		{
			swal("Atención","Todos los campos son obligatorios","error");
			return false;
		}

		let elementsValid = document.getElementsByClassName("valid");
        for (let i = 0; i < elementsValid.length; i++) { 
            if(elementsValid[i].classList.contains('is-invalid')) { 
                swal("Atención", "Por favor verifique los campos en rojo." , "error");
                return false;
            } 
        }

		var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		var ajaxUrl = base_url+'/Usuarios/setUsuario';
		var formData = new FormData(formUsuario);
		request.open("POST",ajaxUrl,true);
		request.send(formData);

		request.onreadystatechange = function(){
            if(request.readyState == 4 && request.status == 200){
                var objData = JSON.parse(request.responseText);
                if(objData.status)
                {
                    $('#modalFormUsuario').modal("hide");
                    formUsuario.reset();
                    swal("Usuarios", objData.msg ,"success");
                    tableUsuarios.api().ajax.reload();
                }else{
                    swal("Error", objData.msg , "error");
                }
            }
        }
	}
}, false);

window.addEventListener('load',function(){
	fntRolesUsuario();
	/*fntViewUsuario();
	fntEditUsuario();
	fntDelUsuario();*/
}, false);


function fntViewUsuario(idUsuario) {
	
	var idpersona = idUsuario;
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	var ajaxUrl = base_url+'/Usuarios/getUsuario/'+idpersona;
	request.open("GET",ajaxUrl,true);
	request.send();

	request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            var objData = JSON.parse(request.responseText);

            if(objData.status)
            {
               var estadoUsuario = objData.data.status == 1 ? 
                '<span class="badge badge-success">Activo</span>' : 
                '<span class="badge badge-danger">Inactivo</span>';

                document.querySelector("#celIdentificacion").innerHTML = objData.data.identificacion;
                document.querySelector("#celNombre").innerHTML = objData.data.nombres;
                document.querySelector("#celApellido").innerHTML = objData.data.apellidos;
                document.querySelector("#celTelefono").innerHTML = objData.data.telefono;
                document.querySelector("#celEmail").innerHTML = objData.data.email_user;
                document.querySelector("#celTipoUsuario").innerHTML = objData.data.nombrerol;
                document.querySelector("#celEstado").innerHTML = estadoUsuario;
                document.querySelector("#celFechaRegistro").innerHTML = objData.data.fechaRegistro; 
                $('#modalViewUser').modal('show');
            }else{
                swal("Error", objData.msg , "error");
            }
        }
    }

	$('#modalViewUser').modal('show');
}

function openModal() {
	document.querySelector('#idUsuario').value="";
	document.querySelector('.modal-header').classList.replace("headerUpdate","headerRegister");
	document.querySelector('#btnActionForm').classList.replace("btn-info","btn-primary");
	document.querySelector('#btnText').innerHTML = "Guardar";
	document.querySelector('#titleModal').innerHTML = "Nuevo Usuario";
	document.querySelector('#formUsuario').reset();

	$('#modalFormUsuario').modal('show');
}

function fntRolesUsuario(){
	var ajaxUrl = base_url+'/Roles/getSelectRoles';
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	request.open("GET",ajaxUrl,true);
	request.send();

	request.onreadystatechange = function(){
		if (request.readyState == 4 && request.status == 200) {
			document.querySelector('#listRolid').innerHTML = request.responseText;
			document.querySelector('#listRolid').value = 1;
			$('#listRolid').selectpicker('render');
		}
	}
}

function fntEditUsuario(idUsuario) {
	document.querySelector('.modal-header').classList.replace("headerRegister","headerUpdate");
	document.querySelector('#btnActionForm').classList.replace("btn-primary","btn-info");
	document.querySelector('#btnText').innerHTML = "Actualizar";
	document.querySelector('#titleModal').innerHTML = "Actualizar datos de Usuario";

	var idpersona = idUsuario;
	var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	var ajaxUrl = base_url+'/Usuarios/getUsuario/'+idpersona;
	request.open("GET",ajaxUrl,true);
	request.send();

	request.onreadystatechange = function(){
		if(request.readyState == 4 && request.status == 200){
			var objData = JSON.parse(request.responseText);

			if(objData.data.status){
				document.querySelector('#idUsuario').value = objData.data.idpersona;
				document.querySelector('#txtIdentificacion').value = objData.data.identificacion;
				document.querySelector('#txtNombre').value = objData.data.nombres;
				document.querySelector('#txtApellido').value = objData.data.apellidos;
				document.querySelector('#txtTelefono').value = objData.data.telefono;
				document.querySelector('#txtEmail').value = objData.data.email_user;
				document.querySelector('#listRolid').value = objData.data.idrol;
				$('#listRolid').selectpicker('render');

				if(objData.data.status == 1){
					document.querySelector('#listStatus').value = 1;
				}else{
					document.querySelector('#listStatus').value = 2;
				}
				$('#listStatus').selectpicker('render');
			}
		}
        $('#modalFormUsuario').modal('show');
    }
}

function fntDelUsuario(idusuario)
{

    var idUsuario = idusuario;

    swal({
        title: "Eliminar Usuario",
        text: "¿Realmente quiere eliminar al Usuario?",
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        closeOnConfirm: false,
        closeOnCancel: true
    }, function(isConfirm){

        if (isConfirm) 
        {
            var request = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            var ajaxUrl = base_url+'/Usuarios/delUsuario/';
            var strData = "idUsuario="+idUsuario;
            request.open("POST",ajaxUrl,true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(strData);
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    var objData = JSON.parse(request.responseText);
                    if(objData.status)
                    {
                        swal("Eliminar!", objData.msg , "success");
                        tableUsuarios.api().ajax.reload();
                    }else{
                        swal("Atención!", objData.msg , "error");
                    }
                }
            }
        }

    });
}

