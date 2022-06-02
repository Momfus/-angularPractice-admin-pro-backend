public static String[] response( Integer input ) {
		
	 //Insert your code here 
	 String[] response = new String[input];
		for (int i=1; i<=input; i++){
			if (i%15 == 0)
				response[i-1] = "FizzBuzz";
			else if (i%3 == 0)
				response[i-1] = "Fizz";
			else if (i%5 == 0)
				response[i-1] = "Buzz";
			else
				response[i-1] = String.valueOf(i);
		}
		return response;
}
