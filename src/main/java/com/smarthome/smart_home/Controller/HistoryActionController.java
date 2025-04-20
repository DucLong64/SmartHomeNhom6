package com.smarthome.smart_home.Controller;


import com.smarthome.smart_home.Entity.HistoryAction;
import com.smarthome.smart_home.Service.HistoryActionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/history")
@CrossOrigin(origins = "*")
public class HistoryActionController {

    @Autowired
    private HistoryActionService historyActionService;

    // Lấy toàn bộ lịch sử
    @GetMapping
    public ResponseEntity<List<HistoryAction>> getAllHistory() {
        List<HistoryAction> historyActions = historyActionService.getAllHistoryActions();
        return historyActions.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(historyActions);
    }

    // Lấy lịch sử theo thiết bị
    @GetMapping("/{device}")
    public ResponseEntity<List<HistoryAction>> getHistoryByDevice(@PathVariable String device) {
        List<HistoryAction> historyActions = historyActionService.getAllHistoryActions()
                .stream()
                .filter(action -> action.getName().equalsIgnoreCase(device))
                .collect(Collectors.toList());

        return historyActions.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(historyActions);
    }
}