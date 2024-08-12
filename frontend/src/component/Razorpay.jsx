import axios from 'axios';
import React, { useState } from 'react'
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
export const Razorpay = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        amount: ''
      });
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handlePayment = async (e) => {
        e.preventDefault();
    
        try {
          const orderResponse = await axios.get(`http://localhost:9000/create?amount=${formData.amount}`);
          console.log(orderResponse)
          const orderData = orderResponse.data;
          var options = {
            key: "rzp_test_dTnukFGWZUKA0z",
            amount: orderData.data.amount, //
            currency: orderData.data.currency,
            name: formData.name,
            description: "Test Transaction",
            image: "https://deep-maurya.github.io/assest/Deepak_maurya.png",
            order_id: orderData.data.id, // Order ID from backend
            handler: async function (response) {
              console.log(response);
              alert(`Payment ID: ${response.razorpay_payment_id}`);
              alert(`Order ID: ${response.razorpay_order_id}`);
            },
          };
    
          var rzp1 = new window.Razorpay(options);
          rzp1.open();
        } catch (error) {
          console.error('Error fetching order:', error);
        }
      };
    
      return (
        <>
          <Box 
            display="flex" 
            justifyContent="center" 
            alignItems="center" 
            height="100vh" 
            bg="gray.50"
        >
            <Box 
                p={5} 
                shadow="md" 
                borderWidth="1px" 
                borderRadius="lg" 
                bg="white"
                textAlign={"center"}
                width={{ base: "90%", sm: "400px" }} // Responsive width
            >
                <Heading as="h1" size="lg" mb={30} textAlign="center">
                    Razorpay Payment Integration
                </Heading>
                <form onSubmit={handlePayment}>
                    <FormControl mb={4} >
                       
                        <Input
                            size={'lg'}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                            required
                            
                        />
                    </FormControl>
                    <FormControl mb={4}>
                        
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            required
                        />
                    </FormControl>
                    <FormControl mb={4}>
                       
                        <Input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder='Enter Your Mobile number'
                            required
                        />
                    </FormControl>
                    <FormControl mb={4}>
                       
                        <Input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder='Enter Amount'
                            required
                        />
                    </FormControl>
                    <Button 
                        type="submit" 
                        colorScheme="teal" 
                        width="full"
                    >
                        Pay ₹{formData.amount || '...'}
                    </Button>
                </form>
            </Box>
        </Box>
        </>
      );
}
