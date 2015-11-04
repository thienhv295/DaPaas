package com.saltlux.dapaas.controller;

import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.saltlux.dapaas.model.ProcessBar;
import com.saltlux.dapaas.model.Slider;

/**
 * Return random value for progress bar in json format  .
 */
@Controller
public class ProcessController {
	private static final Logger logger = LoggerFactory.getLogger(ProcessController.class);

	
	/**
	 * Simply return random value  for process bar in the left .
	 */
	@RequestMapping(value = "/process", method = RequestMethod.GET, produces="application/json")
	public @ResponseBody ProcessBar  getAreaData(@RequestParam(value = "city", required = true) String city,
			@RequestParam(value = "slider", required = false) String slider,
			Model dataModel) {
		logger.info("get  data  for city with  name: " + city );
		if(slider!=null){
			logger.info("slider: " + slider.toString() );
			Slider parsedSlider = new Gson().fromJson(slider, Slider.class);
			logger.info("parsedSlider: " + parsedSlider.toString() );
			}
		Random random = new Random();
		// return data  with random number between 0 and 100
		return new ProcessBar(city,random.nextInt(100),random.nextInt(100),random.nextInt(100),
				random.nextInt(100),random.nextInt(100),random.nextInt(100));
	}
}
