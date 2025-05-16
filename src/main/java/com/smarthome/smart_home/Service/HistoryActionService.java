package com.smarthome.smart_home.Service;


import com.smarthome.smart_home.Entity.HistoryAction;
import com.smarthome.smart_home.Repository.HistoryActionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryActionService {

    @Autowired
    private HistoryActionRepository historyActionRepository;

    public HistoryAction saveHistoryAction(HistoryAction historyAction) {
        return historyActionRepository.save(historyAction);
    }

    public List<HistoryAction> getAllHistoryActions() {
        return historyActionRepository.findAll();
    }

    public HistoryAction getHistoryActionById(Long id) {
        return historyActionRepository.findById(id).orElse(null);
    }
}