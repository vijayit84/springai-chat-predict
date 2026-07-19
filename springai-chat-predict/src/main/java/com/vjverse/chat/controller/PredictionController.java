package com.vjverse.chat.controller;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vjverse.chat.request.PredictionRequest;
import com.vjverse.chat.response.PredictionResponse;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/predict")
public class PredictionController {

    @Autowired
    private ChatClient chatClient;

    @PostMapping
    public PredictionResponse predict(@RequestBody PredictionRequest request) {

        String prompt = """
               You are an autocomplete engine.
              Rules:
                - Continue only the next 3–10 words that makes a sentence.
                - Do not explain.
                - Do not repeat the input.
                - Return plain text only.
                - Stop naturally.

              Input:
                %s
                """.formatted(request.getText());

        String prediction = chatClient.prompt(prompt)
                .call()
                .content();
          System.out.println("Prediction: " + prediction);
        return new PredictionResponse(prediction);
    }

}