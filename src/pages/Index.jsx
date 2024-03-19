import React, { useState } from "react";
import { Box, Heading, VStack, Text, Input, Button, Image, Flex, Spacer, useToast } from "@chakra-ui/react";
import { FaBalanceScale, FaPlay, FaStop } from "react-icons/fa";

const Index = () => {
  const [targetWeight, setTargetWeight] = useState("");
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isDispensing, setIsDispensing] = useState(false);
  const toast = useToast();

  const handleDispense = () => {
    if (!targetWeight) {
      toast({
        title: "Please enter a target weight",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setIsDispensing(true);
    simulateDispensing();
  };

  const simulateDispensing = () => {
    const timer = setInterval(() => {
      setCurrentWeight((prevWeight) => {
        const newWeight = prevWeight + Math.random() * 0.5;
        if (newWeight >= targetWeight) {
          clearInterval(timer);
          setIsDispensing(false);
          toast({
            title: "Dispensing completed",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
        return newWeight;
      });
    }, 500);
  };

  return (
    <Box p={8}>
      <Flex align="center" mb={8}>
        <Heading size="xl">
          <FaBalanceScale /> Weighing Dispensing Software
        </Heading>
        <Spacer />
        <Image src="https://images.unsplash.com/photo-1522844990619-4951c40f7eda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx3ZWlnaGluZyUyMHNjYWxlfGVufDB8fHx8MTcxMDgxNTI3Mnww&ixlib=rb-4.0.3&q=80&w=1080" alt="Weighing Scale" boxSize="100px" />
      </Flex>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text mb={2}>Target Weight (g):</Text>
          <Input type="number" value={targetWeight} onChange={(e) => setTargetWeight(parseFloat(e.target.value))} placeholder="Enter target weight" />
        </Box>
        <Box>
          <Text mb={2}>Current Weight (g):</Text>
          <Text fontSize="4xl" fontWeight="bold">
            {currentWeight.toFixed(2)}
          </Text>
        </Box>
        <Button colorScheme="blue" size="lg" onClick={handleDispense} disabled={isDispensing} leftIcon={isDispensing ? <FaStop /> : <FaPlay />}>
          {isDispensing ? "Stop Dispensing" : "Start Dispensing"}
        </Button>
      </VStack>
    </Box>
  );
};

export default Index;
