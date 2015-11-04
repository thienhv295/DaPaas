<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}"></c:set>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>PLUQI EDINBURGH</title>
    <link rel="shortcut icon" href="${contextPath}/resources/images/favicon.ico">
    <!-- Bootstrap -->
    <link href="${contextPath}/resources/css/bootstrap.min.css" rel="stylesheet">
	<link href="https://api.mapbox.com/mapbox.js/v2.2.2/mapbox.css" rel="stylesheet">
	
    <link href="${contextPath}/resources/css/material.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/material-fullpalette.min.css" rel="stylesheet">
    <link href="${contextPath}/resources/css/style.css" rel="stylesheet">
     <link href="${contextPath}/resources/css/jquery-ui-1.8.16.custom.css" rel="stylesheet">
	
	<script src="${contextPath}/resources/js/jquery/jquery1.10.2.js"></script>
	<script src="${contextPath}/resources/js/jquery/jquery-ui.js"></script>
	<script src="${contextPath}/resources/js/highcharts/highcharts.js"></script>
	<script src="${contextPath}/resources/js/highcharts/modules/exporting.js"></script>
	<script src="https://api.mapbox.com/mapbox.js/v2.2.2/mapbox.js"></script>
	<script src="${contextPath}/resources/js/main.js"></script>
	
	<script>
		var baseUrl = "${contextPath}";
	</script>
</head>
  
<body>
<div class="wrap">
    
    <div id="header">
        <h1><span class="txt_c_r">PLUQI</span> EDINBURGH</h1>
        <ul class="logo">
            <li class="logo1"><a href="http://project.dapaas.eu"><img src="${contextPath}/resources/images/dapaas_logo.png"></a></li>
            <li class="logo2"><a href="http://www.citi-sense.eu"><img src="${contextPath}/resources/images/citi-sense_logo.png"></a></li>
        </ul>
    </div>
    
    <div id="content">
        <div class="row">
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Your <span class="txt_c_y">PLUQI</span></h3>
                    </div>
                    <div id="map" class="panel-body map_area" style="padding:0px; height:615px;"></div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title">Compare <span class="txt_c_y">PLUQI</span></h3>
                    </div>
                    <div class="panel-body" style="padding:0px; height:615px;">
                        <div class="aiq">AIQ <span class="color">Moderate</span></div>
                        <div class="p_tit">
                            <div style="padding:16px 0; border-right:1px solid #fff;">Edinburgh</div>
                            <div style="padding:8px 0;  border-left:1px solid #fff;"><p id="map-city">Area</p><span>(selected council area)</span></div>
                        </div>

                        <div class="p_area">
                            <span class="progress_tit tit_t">Overall</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-warning progress-bar-r"  id ="overall" style="width:40%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-warning progress-bar-l"  id = "overall"></div>
                            </div>
                        </div>
                        <div class="p_area on">
                            <span class="progress_tit">Daily life satisfaction</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-r" id ="satisfaction" style="width:70%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-l"  id ="satisfaction" ></div>
                            </div>
                        </div>
                        <div class="p_area">
                            <span class="progress_tit">Healthcare level</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-success progress-bar-r" id ="healthcare" style="width:90%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-success progress-bar-l" id ="healthcare"  ></div>
                            </div>
                        </div>
                        <div class="p_area">
                            <span class="progress_tit">Safety and security</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-r"  id = "safety" style="width:50%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-l"  id = "safety"></div>
                            </div>
                        </div>
                        <div class="p_area">
                            <span class="progress_tit">Financial satisfaction</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-success progress-bar-r" id = "finance" style="width:20%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-success progress-bar-l" id = "finance"></div>
                            </div>
                        </div>
                        <div class="p_area ">
                            <span class="progress_tit">Level of opportunity</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-r" id ="opportunity" style="width:60%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-l" id ="opportunity"  ></div>
                            </div>
                        </div>
                        <div class="p_area">
                            <span class="progress_tit">Environmental needs / efficiency</span>
                            <div class="progress line1">
                                <div class="progress-bar progress-bar-success progress-bar-r" id="efficiency" style="width:50%;"></div>
                            </div>
                            <div class="progress line2">
                                <div class="progress-bar progress-bar-success progress-bar-l" id="efficiency" ></div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
        <div class="row">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Navigate <span class="txt_c_y">PLUQI</span> datasets</h3>
                </div>
                <div class="panel-body">
                    <p>   <a  id ="dental-health" class = 'text-blue' href="#">child dental health</a>, <a  id ="cancer" href="#">cancer registrations</a>,<a  id = "life-care"href="#"> end of life care</a></p>
                    <div id="line-chart" class="graph_area">
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <div id="footer">
        <span class="logo3"><a href="http://saltlux.com/en/"><img src="${contextPath}/resources/images/saltlux_logo.png"></a></span>
    </div>
    

</body>
    
</html>








