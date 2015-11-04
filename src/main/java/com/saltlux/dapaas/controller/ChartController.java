package com.saltlux.dapaas.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.saltlux.dapaas.model.LineChart;
import com.saltlux.dapaas.model.Slider;
import com.saltlux.dapaas.model.XYData;

@Controller
public class ChartController {
	private static final Logger logger = LoggerFactory.getLogger(ChartController.class);
	@RequestMapping(value = "/lineData", method = RequestMethod.GET, produces="application/json")
	public @ResponseBody List<LineChart> getDataLineChart(@RequestParam(value = "cities", required = true) String cities,
			@RequestParam(value = "indicator", required = false) String indicator,
			@RequestParam(value = "slider", required = false) String slider) {
		
		String [] cityArr = cities.split(",");
		logger.info("cities: " + Arrays.toString(cityArr));
		logger.info("indicator: " + indicator);
		if(slider!=null){
			Slider parsedSlider = new Gson().fromJson(slider, Slider.class);
			logger.info("parsedSlider: " + parsedSlider.toString() );
			}
		List<LineChart> lst = new ArrayList<LineChart>();
		
		Random random = new Random();
		for (int i = 0; i < 2; i++) {
			int year = 2009;
			LineChart chart = new LineChart();
			List<XYData> lstData = new ArrayList<XYData>();
			for (int j = 0; j < 7; j++) {
				String strDate = (year++) + "/0" + (j+1) + "/01";
				Date date = new Date(strDate);
				XYData data = new XYData();
				data.setX(date.getTime());
				data.setY(random.nextInt(100));
				lstData.add(data);
			}
			chart.setName(cityArr[i]);
			chart.setData(lstData);
			lst.add(chart);
		}
		return lst;
	}
}