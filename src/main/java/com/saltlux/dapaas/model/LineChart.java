package com.saltlux.dapaas.model;

import java.util.List;

public class LineChart {
	private String name;
	private List<?> data;
	
	
	public LineChart() {
		super();
	}

	public LineChart(String name, List<?> data) {
		super();
		this.name = name;
		this.data = data;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<?> getData() {
		return data;
	}

	public void setData(List<?> data) {
		this.data = data;
	}
}
