package com.saltlux.dapaas.model;

/**
 * data to return to client in Json
 */
public class ProcessBar {
	private String city;
	private int opportunity;
	private int finance;
	private int efficiency;
	private int safety;
	private int healthcare;
	private int satisfaction;
	private int overall;

	public ProcessBar(String name,int r1,int r2,int r3,int r4,int r5,int r6) {
		city=name;
		opportunity=r1;
		finance= r2;
		efficiency= r3;
		safety = r4;
		healthcare = r5;
		satisfaction= r6;
		overall=caculateOverall();
	}
	//
	private int caculateOverall() {
		return (opportunity+ finance+ efficiency+ safety+ healthcare+ satisfaction)/6;
	}

	public int getOpportunity() {
		return opportunity;
	}
	public void setOpportunity(int opportunity) {
		this.opportunity = opportunity;
	}
	public int getFinance() {
		return finance;
	}
	public void setFinance(int finance) {
		this.finance = finance;
	}
	public int getSafety() {
		return safety;
	}
	public void setSafety(int safety) {
		this.safety = safety;
	}
	public int getHealthcare() {
		return healthcare;
	}
	public void setHealthcare(int healthcare) {
		this.healthcare = healthcare;
	}
	public int getSatisfaction() {
		return satisfaction;
	}
	public void setSatisfaction(int satisfaction) {
		this.satisfaction = satisfaction;
	}
	public int getOverall() {
		return overall;
	}
	public void setOverall(int overall) {
		this.overall = overall;
	}
	public int getEfficiency() {
		return efficiency;
	}

	public void setEfficiency(int efficiency) {
		this.efficiency = efficiency;
	}

	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}

}
