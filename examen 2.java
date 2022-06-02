public static String prioritizedEvents( String[] events ) {
 
     java.time.LocalTime [][] eventsTime = new java.time.LocalTime[events.length][2];
	 for(int i = 0; i < events.length; i++) {
	   String event = events[i];
	   java.time.LocalTime[] startEndTime = findTimeInLine(event);
	   eventsTime[i][0] = startEndTime[0];
	   eventsTime[i][1] = startEndTime[1];
	 }
  	
     java.util.List<String> eventsToAccept = new java.util.ArrayList<String>();
  
     java.time.LocalTime time = java.time.LocalTime.parse("09:00");
   	 while(!time.equals(java.time.LocalTime.parse("18:00"))) {
	   for(int i = 0; i < events.length; i++) {
	   	  if(time.equals(eventsTime[i][0])) {
				long duration = java.time.temporal.ChronoUnit.MINUTES.between(eventsTime[i][0], eventsTime[i][1]);
			    
			    time = time.plusMinutes(duration);		  
			    eventsToAccept.add(events[i]);
			} else {
				 time = time.plusHours(1);
			}
	     }      
	   }  
  StringBuilder sb = new StringBuilder();
  sb.append("Events to accept:");
  for(String event: eventsToAccept) {
  	 sb.append(event).append(";");
  }
 	
  return sb.toString();
}

private static java.time.LocalTime[] findTimeInLine(String line) {
	String regex = "\\d{2}:\\d{2}";
    java.time.LocalTime[] startEndTime = 
	  						new java.time.LocalTime[2];
	java.util.regex.Matcher m = java.util.regex.Pattern.compile(regex).matcher(line);

	int i = 0;
	if (m.find()) {
		try{
 			startEndTime[i] = java.time.LocalTime.parse(m.group(), 
						java.time.format.DateTimeFormatter.ISO_TIME);
		}catch(java.time.format.DateTimeParseException ex) {
 			startEndTime[i] = null;
		} 
	  	i++;
	 }
     return startEndTime;
}
