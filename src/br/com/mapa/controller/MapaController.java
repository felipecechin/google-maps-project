package br.com.mapa.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import br.com.mapa.dao.FormaDao;
import br.com.mapa.model.Forma;

@Transactional
@Controller
public class MapaController {

	@Autowired
	FormaDao formaDao;

	@RequestMapping("mostrarMapa")
	public ModelAndView mostrarMapa(String form) {
		ModelAndView mv = new ModelAndView("mapa/mostra","Forma",new Forma());
		if (form != null && !form.equals("")) {
			mv.addObject("form", form);
		}
		return mv;
	}

	@RequestMapping("adicionarPonto")
	public String adicionarPonto(@Valid Forma forma, BindingResult result) {
		if (result.hasErrors()) {
			return "mapa/pontoErro";
		}
		formaDao.salvar(forma);
		return "mapa/pontoAdicionado";
	}

	@RequestMapping("mostrarTodosPontos")
	public String mostrarTodosPontos(Model model) {
		List<Forma> pontos = formaDao.getListaPonto();
		String pontosJSON;
		int i = 0;
		pontosJSON = "[";
		for (Forma ponto : pontos) {
			i++;
			if (!ponto.getEndereco1().equals("") && ponto.getEndereco1() != null) {
				pontosJSON += "{";
				pontosJSON += "\"Id\": " + ponto.getId() + ", ";
				pontosJSON += "\"Latitude\": " + ponto.getLatitude1() + ", ";
				pontosJSON += "\"Longitude\": " + ponto.getLongitude1();
				if (pontos.size() == i) {
					pontosJSON += "}";
				} else {
					pontosJSON += "},";
				}
			} else {
				formaDao.remover(ponto);
			}
		}
		pontosJSON += "]";
		model.addAttribute("pontos", pontosJSON);
		return "mapa/pontos";
	}

	@RequestMapping("removerPonto")
	public void removerPonto(Forma forma, HttpServletResponse response) {
		formaDao.remover(forma);
		response.setStatus(200);
	}

	@RequestMapping("adicionarTraco")
	public String adicionarTraco(@Valid Forma forma,BindingResult result) {
		if (result.hasErrors() || forma.getEndereco2().equals("") || forma.getEndereco2() == null) {
			return "mapa/tracoErro";
		}
		formaDao.salvar(forma);
		return "mapa/tracoAdicionado";
	}

	@RequestMapping("mostrarTodosTracos")
	public String mostrarTodosTracos(Model model) {
		List<Forma> tracos = formaDao.getListaTraco();
		String tracosJSON;
		int i = 0;
		tracosJSON = "[";
		for (Forma traco : tracos) {
			i++;
			if (tracos.size() == i) {
				tracosJSON += "{";
				tracosJSON += "\"Id\": " + traco.getId() + ", ";
				tracosJSON += "\"Endereco1\": \"" + traco.getEndereco1() + "\", ";
				tracosJSON += "\"Latitude1\": " + traco.getLatitude1() + ", ";
				tracosJSON += "\"Longitude1\": " + traco.getLongitude1() + ", ";
				tracosJSON += "\"Endereco2\": \"" + traco.getEndereco2() + "\", ";
				tracosJSON += "\"Latitude2\": " + traco.getLatitude2() + ", ";
				tracosJSON += "\"Longitude2\": " + traco.getLongitude2();
				tracosJSON += "}";
			} else {
				tracosJSON += "{";
				tracosJSON += "\"Id\": " + traco.getId() + ", ";
				tracosJSON += "\"Endereco1\": \"" + traco.getEndereco1() + "\", ";
				tracosJSON += "\"Latitude1\": " + traco.getLatitude1() + ", ";
				tracosJSON += "\"Longitude1\": " + traco.getLongitude1() + ", ";
				tracosJSON += "\"Endereco2\": \"" + traco.getEndereco2() + "\", ";
				tracosJSON += "\"Latitude2\": " + traco.getLatitude2() + ", ";
				tracosJSON += "\"Longitude2\": " + traco.getLongitude2();
				tracosJSON += "},";
			}
		}
		tracosJSON += "]";
		model.addAttribute("tracos", tracosJSON);
		return "mapa/tracos";
	}

	@RequestMapping("removerTraco")
	public void removerTraco(Forma forma, HttpServletResponse response) {
		formaDao.remover(forma);
		response.setStatus(200);
	}
}
