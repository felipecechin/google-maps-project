package br.com.mapa.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
public class Forma {
	@Id
	@GeneratedValue
	private Long id;
	@Column
	@NotNull
	private String endereco1;
	@Column
	@NotNull
	private double latitude1;
	@Column
	@NotNull
	private double longitude1;
	@Column
	private String endereco2;
	@Column
	private double latitude2;
	@Column
	private double longitude2;
	@Column
	private String tipo;
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEndereco1() {
		return endereco1;
	}
	public void setEndereco1(String endereco1) {
		this.endereco1 = endereco1;
	}
	public double getLatitude1() {
		return latitude1;
	}
	public void setLatitude1(double latitude1) {
		this.latitude1 = latitude1;
	}
	public double getLongitude1() {
		return longitude1;
	}
	public void setLongitude1(double longitude1) {
		this.longitude1 = longitude1;
	}
	public String getEndereco2() {
		return endereco2;
	}
	public void setEndereco2(String endereco2) {
		this.endereco2 = endereco2;
	}
	public double getLatitude2() {
		return latitude2;
	}
	public void setLatitude2(double latitude2) {
		this.latitude2 = latitude2;
	}
	public double getLongitude2() {
		return longitude2;
	}
	public void setLongitude2(double longitude2) {
		this.longitude2 = longitude2;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	
}

