package com.saltlux.dapaas.model;

public class XYData {
	private long x;
	private double y;
	
	public XYData() {
	}
	public XYData(long x, double y) {
		super();
		this.x = x;
		this.y = y;
	}
	public long getX() {
		return x;
	}
	public void setX(long x) {
		this.x = x;
	}
	public double getY() {
		return y;
	}
	public void setY(double y) {
		this.y = y;
	}
	
	
}
