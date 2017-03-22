<%@ attribute name="id" required="true"%>
<%@ attribute name="valor" required="false"%>


<input id="${id}" name="${id}" type="text" value="${valor}">

<script>
$("#${id}").datepicker({
	changeMonth: true,
    changeYear: true,
    dateFormat: "dd/mm/yy",
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesMin: ['D','S','T','Q','Q','S','S','D'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb','Dom'],
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
    nextText: 'Próximo',
    prevText: 'Anterior'
});
$("#${id}").mask('99/99/9999');
</script>
