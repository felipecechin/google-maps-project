<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<c:url value="/jquery-ui-1.12.1.custom/jquery-ui.css"/>"
	rel="stylesheet">
<link
	href="<c:url value="/jquery-ui-1.12.1.custom/jquery-ui.structure.css"/>"
	rel="stylesheet">
<link
	href="<c:url value="/jquery-ui-1.12.1.custom/jquery-ui.theme.css"/>"
	rel="stylesheet">
<script
	src="<c:url value="/jquery-ui-1.12.1.custom/external/jquery/jquery.js"/>"></script>
<script src="<c:url value="/jquery-ui-1.12.1.custom/jquery-ui.js"/>"></script>
<script
	src="<c:url value="/jquery-ui-1.12.1.custom/jquery.maskedinput.min.js"/>"></script>
<style type="text/css">
body {
	font-family: Verdana;
	font-size: 14px;
	font-style: normal;
}
.campo {
	border: 1px solid #CCCCCC;
	background-color: #F0F0F0;
	width: 200px;
}
.instrucoes {
	background-color: #E1F0BC; 
	border: 1px solid #4E7700;
	color:#4E7700;
	width:300px;
	margin:auto;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		$('#formPonto').hide();
		$('#formTraco').hide();
		$('#novoPonto').hide();	
	});
	function recarregarPagina(valor) {
		window.location.href = "mostrarMapa?form="+valor;
	}
</script>
<c:if test="${not empty form}">
	<script type="text/javascript">
	$(document).ready(function() {
		trocarFormulario('${form}');
	});
	</script>
</c:if>
<title>Atividade mapa</title>
</head>
<body>

	<script src="<c:url value="/js/mapaConf.js"/>"></script>
	<h2 style="text-align: center;">Atividade mapa</h2>
	<table width="100%" style="border:1px solid black;" cellspacing="0" cellpadding="0"> 
		<tr>
			<td width="70%" style="border-right:1px solid black;">
				<div id="googleMap" style="width: 100%; height: 550px; border:0;"></div>
			</td>
			<td style="vertical-align:middle;">
			<table width="400" align="center">
					<tr>
						<td colspan="2" style="text-align: center;">Selecione a forma
							que você deseja adicionar ao mapa:</td>
					</tr>
					<tr>
						<td>
							<table align="right">
								<tr>
									<td><img src="<c:url value="/img/ponto.png"/>"></td>
									<td>(PONTO)</td>
									<td><input type="radio" name="tipo" value=""
										onclick="recarregarPagina('ponto');"></td>
								</tr>
							</table>
						</td>
						<td>
							<table align="left">
								<tr>
									<td><img src="<c:url value="/img/traco.png"/>"> (TRAÇO)
									</td>
									<td><input type="radio" name="tipo" value=""
										onclick="recarregarPagina('traco');"></td>
								</tr>
							</table>
						</td>
					</tr>
			</table>
			<table width="100%" height="490" align="center" id="formPonto" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<hr>
					</td>
				</tr>
				<tr>
					<td width="500" style="vertical-align: top;">
						<table align="center">
							<tr>
								<td id="txtAcao">
								CADASTRO DE PONTO</td>
								<td><img src="<c:url value="/img/ponto.png"/>"></td>
							</tr>
						</table>
						<form:form action="adicionarPonto" method="post" id="formPontoform" modelAttribute="Forma">
							<form:hidden path="id" value="" id="txtId"/>
							<form:hidden path="tipo" value="ponto" />
							<table align="center">
								<tr>
									<td><form:label path="endereco1">Endereço:</form:label></td>
									<td align="right"><form:input path="endereco1" id="txtEndereco"
										class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="latitude1">Latitude:</form:label></td>
									<td align="right"><form:input path="latitude1" id="txtLatitude"
										class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="longitude1">Longitude:</form:label></td>
									<td align="right"><form:input path="longitude1" id="txtLongitude"
										class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td align="center" colspan="2">
										<input type="button" value="Cadastrar novo" onclick="recarregarPagina('ponto')" id="novoPonto">
										<input type="submit" value="Salvar" id="txtSubmit">
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<table class="instrucoes">
											<tr>
												<td><b>Instruções</b></td>
											</tr>
											<tr>
												<td>
													<ul style="margin:0px;padding:0px 10px 0px 20px;text-align:justify;">
														<li><b>Para adicionar</b>: clique em uma posição no mapa e, após, clique em salvar.</li>
														<li><b>Para alterar a posição de um ponto</b>: clique, segure e arraste para a posição desejada.</li>
														<li><b>Para excluir um ponto</b>: clique em um ponto com o botão direito do mouse e clique OK.</li>
													</ul>
												</td>
											</tr>	
										</table>
									</td>
								</tr>
							</table>
						</form:form>
					</td>
				</tr>
			</table>
			<table width="100%" height="490" align="center" id="formTraco" cellpadding="0" cellspacing="0">
				<tr>
					<td>
						<hr>
					</td>
				</tr>
				<tr>
					<td style="vertical-align: top;">
						<table align="center">
							<tr>
								<td id="txtAcaoTraco">CADASTRO DE TRAÇO</td>
								<td><img src="<c:url value="/img/traco.png"/>"></td>
							</tr>
						</table>
						<form:form action="adicionarTraco" method="post" id="formTracoform" modelAttribute="Forma">
							<form:hidden path="id" value="" id="txtIdTraco"/>
							<form:hidden path="tipo" value="traco"/>
							<table align="center" id="formExtremidade1">
								<tr>
									<td colspan="2" style="text-align: center;">EXTREMIDADE 1</td>
								</tr>
								<tr>
									<td><form:label path="endereco1">Endereço:</form:label></td>
									<td align="right"><form:input path="endereco1"
										id="txtEnderecoTraco1" class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="latitude1">Latitude:</form:label></td>
									<td align="right"><form:input path="latitude1"
										id="txtLatitudeTraco1" class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="longitude1">Longitude:</form:label></td>
									<td align="right"><form:input path="longitude1"
										id="txtLongitudeTraco1" class="campo" readonly=""/>
										</td>
								</tr>
								<tr>
								<td style="text-align: center;" colspan="2">
									<input type="button" value="Alternar para extremidade 2" onclick="trocarExtremidade(2)" id="botAlternar2">
									<input type="button" value="Alternar para extremidade 2" class="botAlternarEdit2" onclick="trocarExtremidadeEditavel(pathEditavel,2);">
								</td>
								</tr>
								<tr>
									<td style="text-align: center;" colspan="2">
										<input type="button" onclick="recarregarPagina('traco')" class="botAlternarEdit2" value="Cadastrar novo">
										<input type="submit" value="Salvar" id="txtSubmitTraco2">
									</td>
								</tr>
								<tr>
									<td colspan="2">
										<table class="instrucoes">
											<tr>
												<td><b>Instruções</b></td>
											</tr>
											<tr>
												<td>
													<ul style="margin:0px;padding:0px 10px 0px 20px;text-align:justify;">
														<li><b>Para adicionar</b>: clique em uma posição no mapa para a extremidade 1. Após a escolha da posição 1, faça o mesmo procedimento alternando para a extremidade 2 e clique em salvar.</li>
														<li><b>Para alterar um traço</b>: clique sobre o traço e edite suas extremidades ao clicar em posições do mapa.</li>
														<li><b>Para excluir um traço</b>: clique sobre o traço com o botão direito do mouse e clique OK.</li>
													</ul>
												</td>
											</tr>	
										</table>
									</td>
								</tr>
							</table>
							<table align="center" id="formExtremidade2" style="display:none;">
								<tr>
									<td colspan="2" style="text-align: center;">EXTREMIDADE 2</td>
								</tr>
								<tr>
									<td><form:label path="endereco2">Endereço:</form:label></td>
									<td align="right"><form:input path="endereco2"
										id="txtEnderecoTraco2" class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="latitude2">Latitude:</form:label></td>
									<td align="right"><form:input path="latitude2"
										id="txtLatitudeTraco2" class="campo" readonly=""/></td>
								</tr>
								<tr>
									<td><form:label path="longitude2">Longitude:</form:label></td>
									<td align="right"><form:input path="longitude2"
										id="txtLongitudeTraco2" class="campo" readonly=""/></td>
								</tr>
								<tr>
								<td style="text-align: center;" colspan="2">
									<input type="button" value="Alternar para extremidade 1" onclick="trocarExtremidade(1)" id="botAlternar1">
									<input type="button" value="Alternar para extremidade 1" class="botAlternarEdit1" onclick="trocarExtremidadeEditavel(pathEditavel,1);">
								</td>
								</tr>
								<tr>
									<td style="text-align: center;" colspan="2">
										<input type="button" onclick="recarregarPagina('traco')" class="botAlternarEdit1" value="Cadastrar novo">
										<input type="submit" value="Salvar" id="txtSubmitTraco"></td>
								</tr>
								<tr>
									<td colspan="2">
										<table class="instrucoes">
											<tr>
												<td><b>Instruções</b></td>
											</tr>
											<tr>
												<td>
													<ul style="margin:0px;padding:0px 10px 0px 20px;text-align:justify;">
														<li><b>Para adicionar</b>: clique em uma posição no mapa para a extremidade 1. Após a escolha da posição 1, faça o mesmo procedimento alternando para a extremidade 2 e clique em salvar.</li>
														<li><b>Para alterar um traço</b>: clique sobre o traço e edite suas extremidades ao clicar em posições do mapa.</li>
														<li><b>Para excluir um traço</b>: clique sobre o traço com o botão direito do mouse e clique OK.</li>
													</ul>
												</td>
											</tr>	
										</table>
									</td>
								</tr>
							</table>
						</form:form></td>
				</tr>
			</table>
			</td>
		</tr>
	</table>
	<script
		src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsQsOkyPGWRhWuhiR4Zf8vlViZbgtM0IU&callback=myMap">
		
	</script>
</body>
</html>