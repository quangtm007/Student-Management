package com.ait.manager.repository;

import java.util.List;

import com.ait.manager.model.Status;
import com.ait.manager.model.dto.SearchDTO;

public interface PostRepositoryCustom {
	List<SearchDTO> searchEvent(long userId, long eventId, long classId, Status status ,Status status2 , Status status3 );
}
