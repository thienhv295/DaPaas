package com.saltlux.dapaas.model;

public class Slider {
	private String selectedIndex;
	private double political;
	private double opportunity;
	private double finance;
	private double efficiency;
	private double safety;
	private double healthcare;
	private double satisfaction;
	private double cultural;


	public Slider(String selectedIndex, double political, double opportunity,
			double finance, double efficiency, double safety,
			double healthcare, double satisfaction, double cultural) {
		this.selectedIndex = selectedIndex;
		this.political = political;
		this.opportunity = opportunity;
		this.finance = finance;
		this.efficiency = efficiency;
		this.safety = safety;
		this.healthcare = healthcare;
		this.satisfaction = satisfaction;
		this.cultural = cultural;
	}

	public double getPolitical() {
		return political;
	}

	public void setPolitical(double political) {
		this.political = political;
	}

	public double getOpportunity() {
		return opportunity;
	}

	public void setOpportunity(double opportunity) {
		this.opportunity = opportunity;
	}

	public double getFinance() {
		return finance;
	}

	public void setFinance(double finance) {
		this.finance = finance;
	}

	public double getEfficiency() {
		return efficiency;
	}

	public void setEfficiency(double efficiency) {
		this.efficiency = efficiency;
	}

	public double getSafety() {
		return safety;
	}

	public void setSafety(double safety) {
		this.safety = safety;
	}

	public double getHealthcare() {
		return healthcare;
	}

	public void setHealthcare(double healthcare) {
		this.healthcare = healthcare;
	}

	public double getSatisfaction() {
		return satisfaction;
	}

	public void setSatisfaction(double satisfaction) {
		this.satisfaction = satisfaction;
	}

	public double getCultural() {
		return cultural;
	}

	public void setCultural(double cultural) {
		this.cultural = cultural;
	}

	public String getSelectedIndex() {
		return selectedIndex;
	}

	public void setSelectedIndex(String selectedIndex) {
		this.selectedIndex = selectedIndex;
	}

	@Override
	public String toString() {
		return "Slider [selectedIndex=" + selectedIndex + ", political="
				+ political + ", opportunity=" + opportunity + ", finance="
				+ finance + ", efficiency=" + efficiency + ", safety=" + safety
				+ ", healthcare=" + healthcare + ", satisfaction="
				+ satisfaction + ", cultural=" + cultural + "]";
	}



}
