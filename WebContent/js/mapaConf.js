var map;
var brasil = {
	lat : -29.686654,
	lng : -53.813095
};
var marker = [];
var linha = [];
var poly;
var pathEditavel;

function myMap() {
	var mapProp = {
		center : brasil,
		zoom : 16,
		zoomControl : true,
		mapTypeControl : true,
		scaleControl : true,
		streetViewControl : true,
		rotateControl : true
	};

	map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
	poly = new google.maps.Polyline({
		strokeColor : '#3CB371',
		strokeOpacity : 1.0,
		strokeWeight : 5
	});
	poly.setMap(map);
	$.post("mostrarTodosPontos", function(resposta) {
		resposta = typeof resposta == 'string' ? JSON.parse(resposta)
				: resposta;
		var i = 0;
		resposta.forEach(function(ponto) {
			marker[i] = new google.maps.Marker({
				position : new google.maps.LatLng(ponto.Latitude,
						ponto.Longitude),
				title : "Clique, segure e arraste para alterar a posição do ponto",
				map : map,
				icon : 'img/ponto.png',
				draggable : true,
				id : ponto.Id
			});
			marker[i].addListener('rightclick', function() {
				var decisao = confirm("Clique OK para remover o ponto");
				if (decisao) {
					this.setVisible(false);
					$.post("removerPonto", {
						'id' : this.id
					}, function() {
						alert("Ponto removido com sucesso");
						window.location.href = "mostrarMapa";
					});
				}
			});
			marker[i].addListener('dragend', function() {
				poly.setMap(null);
				$('#formTraco').hide();
				$('#txtAcao').html("ALTERANDO PONTO");
				$('#txtId').val(this.id);
				$('#formPonto').show();
				$('#novoPonto').show();
				geocoder = new google.maps.Geocoder();
				geocoder.geocode({
					'latLng' : this.getPosition()
				},
						function(results, status) {
							if (status == google.maps.GeocoderStatus.OK) {
								if (results[0]) {
									var lat = formatarLatLng(results[0].geometry.location.lat());
									var long = formatarLatLng(results[0].geometry.location.lng());
									$('#txtEndereco').val(
											results[0].formatted_address);
									$('#txtLatitude').val(lat);
									$('#txtLongitude').val(long);
								}
							}
						});
			});
			i++;
		});
	});

	$.post("mostrarTodosTracos", function(resposta) {
		resposta = typeof resposta == 'string' ? JSON.parse(resposta)
				: resposta;
		var i = 0;
		resposta.forEach(function(traco) {
			var coordenadas = [ {
				lat : traco.Latitude1,
				lng : traco.Longitude1
			}, {
				lat : traco.Latitude2,
				lng : traco.Longitude2
			} ];
			linha[i] = new google.maps.Polyline({
				path : coordenadas,
				geodesic : true,
				strokeColor : '#1800DC',
				strokeOpacity : 1.0,
				strokeWeight : 5,
				id: traco.Id,
				endereco1: traco.Endereco1,
				endereco2: traco.Endereco2
			});
			linha[i].setMap(map);
			linha[i].addListener('click', function () {
				google.maps.event.clearListeners(map, 'click');
				limparCliquePontos();
				limparFormulario("formTracoform");
				poly.setMap(null);
				$('#formPonto').hide();
				$('#txtAcaoTraco').html("ALTERANDO TRAÇO");
				$('#txtIdTraco').val(this.id);
				$('#formTraco').show();
				$('#botAlternar2').hide();
				$('.botAlternarEdit2').show();
				var lat1 = formatarLatLng(this.getPath().getAt(0).lat());
				var long1 = formatarLatLng(this.getPath().getAt(0).lng());
				var lat2 = formatarLatLng(this.getPath().getAt(1).lat());
				var long2 = formatarLatLng(this.getPath().getAt(1).lng());
				$('#txtEnderecoTraco1').val(this.endereco1);
				$('#txtLatitudeTraco1').val(lat1);
				$('#txtLongitudeTraco1').val(long1);
				$('#txtEnderecoTraco2').val(this.endereco2);
				$('#txtLatitudeTraco2').val(lat2);
				$('#txtLongitudeTraco2').val(long2);
				alert("Clique no mapa para selecionar a posição da extremidade 1 do traço");
				pathEditavel = this.getPath();
				pegarPosicaoPontoEditavel(pathEditavel,1);
				map.addListener('click', function(event) {
					geocoder = new google.maps.Geocoder();
					geocoder.geocode({
						'latLng' : event.latLng
					}, function(results, status) {
						if (status == google.maps.GeocoderStatus.OK) {
							if (results[0]) {
								var lat = formatarLatLng(event.latLng.lat());
								var long = formatarLatLng(event.latLng.lng());
								$('#txtEnderecoTraco1').val(results[0].formatted_address);
								$('#txtLatitudeTraco1').val(lat);
								$('#txtLongitudeTraco1').val(long);
								if (pathEditavel.getAt(0) != undefined) {
									pathEditavel.removeAt(0);
								}
								pathEditavel.insertAt(0,event.latLng);
							}
						}
					});
				});
			});
			linha[i].addListener('rightclick', function () {
				var decisao = confirm("Clique OK para remover o traço");
				if (decisao) {
					this.setVisible(false);
					$.post("removerTraco", {
						'id' : this.id
					}, function() {
						alert("Traço removido com sucesso");
						window.location.href = "mostrarMapa";
					});
				}
			});
			i++;
		});
	});

}

function trocarFormulario(valor) {
	google.maps.event.clearListeners(map, 'click');
	limparCliquePontos();
	if (valor == "ponto") {
		poly.setMap(null);
		limparFormulario("formPontoform");
		$('#formTraco').hide();
		$('#novoPonto').hide();
		$('#txtAcao').html("CADASTRO DE PONTO");
		$('#txtId').val("");
		$('#formPonto').show();
		map.addListener('click', function(event) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : event.latLng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var lat = formatarLatLng(event.latLng.lat());
						var long = formatarLatLng(event.latLng.lng());
						$('#txtEndereco').val(results[0].formatted_address);
						$('#txtLatitude').val(lat);
						$('#txtLongitude').val(long);
					}
				}
			});
		});
	} else if (valor == "traco") {
		var path = poly.getPath();
		if (path.getAt(0) != undefined) {
			path.removeAt(0);
		} 
		if (path.getAt(1) != undefined) {
			path.removeAt(1);
		}
		poly.setMap(map);
		limparFormulario("formTracoform");
		$('#formPonto').hide();
		$('#formExtremidade2').hide();
		$('#formExtremidade1').show();
		$('.botAlternarEdit2').hide();
		$('.botAlternarEdit1').hide();
		$('#botAlternar2').show();
		$('#txtAcaoTraco').html("CADASTRO DE TRAÇO");
		$('#txtIdTraco').val("");
		$('#formTraco').show();
		alert("Clique no mapa para selecionar a posição da extremidade 1 do traço");
		pegarPosicaoPonto(1);
		map.addListener('click', function(event) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : event.latLng
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var lat = formatarLatLng(event.latLng.lat());
						var long = formatarLatLng(event.latLng.lng());
						$('#txtIdTraco').val("");
						$('#txtEnderecoTraco1').val(
								results[0].formatted_address);
						$('#txtLatitudeTraco1').val(lat);
						$('#txtLongitudeTraco1').val(long);
						var path = poly.getPath();
						if (path.getAt(0) != undefined) {
							path.removeAt(0);
						}
						path.insertAt(0,event.latLng);
					}
				}
			});
		});

	}
}

function trocarExtremidade(valor) {
	if (valor == 1) {
		$('#formExtremidade2').hide();
		$('#formExtremidade1').show();
		$('.botAlternarEdit2').hide();
		$('#botAlternar2').show();
	} else if (valor == 2) {
		$('#formExtremidade1').hide();
		$('#formExtremidade2').show();
		$('.botAlternarEdit1').hide();
		$('#botAlternar1').show();
	}
	limparCliquePontos();
	pegarPosicaoPonto(valor);
	google.maps.event.clearListeners(map, 'click');
	map.addListener('click', function(event) {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : event.latLng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var lat = formatarLatLng(event.latLng.lat());
					var long = formatarLatLng(event.latLng.lng());
					$('#txtIdTraco').val("");
					$('#txtEnderecoTraco' + valor).val(
							results[0].formatted_address);
					$('#txtLatitudeTraco' + valor).val(lat);
					$('#txtLongitudeTraco' + valor).val(long);
					var path = poly.getPath();
					if (path.getAt((valor-1)) != undefined) {
						path.removeAt((valor-1));
					}
					path.insertAt((valor-1),event.latLng);
				}
			}
		});
	});
}

function pegarPosicaoPonto(valor) {
	marker.forEach(function(item, index) {
		marker[index].addListener('click', function(event) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : marker[index].getPosition()
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var lat = formatarLatLng(marker[index].getPosition().lat());
						var long = formatarLatLng(marker[index].getPosition().lng());
						$('#txtEnderecoTraco' + valor).val(
								results[0].formatted_address);
						$('#txtLatitudeTraco' + valor).val(lat);
						$('#txtLongitudeTraco' + valor).val(long);
						var path = poly.getPath();
						if (path.getAt((valor-1)) != undefined) {
							path.removeAt((valor-1));
						}
						path.insertAt((valor-1),event.latLng);
					}
				}
			});
		});
	});
}

function limparCliquePontos() {
	marker.forEach(function(item, index) {
		google.maps.event.clearListeners(marker[index], 'click');
	});
}

function limparFormulario(id) {
	$('#' + id).each(function() {
		this.reset();
	});
}

function trocarExtremidadeEditavel(pathEditavel,valor) {
	if (valor == 1) {
		$('#formExtremidade2').hide();
		$('#formExtremidade1').show();
		$('.botAlternarEdit2').show();
		$('#botAlternar2').hide();
	} else if (valor == 2) {
		$('#formExtremidade1').hide();
		$('#formExtremidade2').show();
		$('.botAlternarEdit1').show();
		$('#botAlternar1').hide();
	}
	limparCliquePontos();
	pegarPosicaoPontoEditavel(pathEditavel,valor);
	google.maps.event.clearListeners(map, 'click');
	map.addListener('click', function(event) {
		geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng' : event.latLng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[0]) {
					var lat = formatarLatLng(event.latLng.lat());
					var long = formatarLatLng(event.latLng.lng());
					$('#txtEnderecoTraco' + valor).val(
							results[0].formatted_address);
					$('#txtLatitudeTraco' + valor).val(lat);
					$('#txtLongitudeTraco' + valor).val(long);
					if (pathEditavel.getAt((valor-1)) != undefined) {
						pathEditavel.removeAt((valor-1));
					}
					pathEditavel.insertAt((valor-1),event.latLng);
				}
			}
		});
	});
}

function pegarPosicaoPontoEditavel(pathEditavel,valor) {
	marker.forEach(function(item, index) {
		marker[index].addListener('click', function(event) {
			geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'latLng' : marker[index].getPosition()
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var lat = formatarLatLng(marker[index].getPosition().lat());
						var long = formatarLatLng(marker[index].getPosition().lng());
						$('#txtEnderecoTraco' + valor).val(
								results[0].formatted_address);
						$('#txtLatitudeTraco' + valor).val(lat);
						$('#txtLongitudeTraco' + valor).val(long);
						if (pathEditavel.getAt((valor-1)) != undefined) {
							pathEditavel.removeAt((valor-1));
						}
						pathEditavel.insertAt((valor-1),event.latLng);
					}
				}
			});
		});
	});
}

function formatarLatLng(valor) {
	var latLng = valor.toString().split('.');
	return latLng[0] + '.' + latLng[1].substring(0, 6);
}

