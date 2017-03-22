package br.com.mapa.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import br.com.mapa.model.Forma;

@Repository
public class FormaDao {

	@PersistenceContext
	EntityManager manager;

	public void salvar(Forma forma) {
		manager.merge(forma);
	}

	@SuppressWarnings("unchecked")
	public List<Forma> getListaPonto() {
		return manager.createQuery("select forma from Forma forma where forma.tipo LIKE :tipo").setParameter("tipo","ponto").getResultList();
	}
	
	@SuppressWarnings("unchecked")
	public List<Forma> getListaTraco() {
		return manager.createQuery("select forma from Forma forma where forma.tipo LIKE :tipo").setParameter("tipo","traco").getResultList();
	}

	public Forma obterPorId(Long id) {
		return manager.find(Forma.class, id);
	}

	public void remover(Forma forma) {
		Forma formaARemover = this.obterPorId(forma.getId());
		manager.remove(formaARemover);
	}
}
