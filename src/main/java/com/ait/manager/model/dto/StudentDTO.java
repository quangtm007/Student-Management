package com.ait.manager.model.dto;

import com.ait.manager.model.Status;

public interface StudentDTO {

	Long getPost_id();

	String getClass_name();

	String getEvent_name();

	Status getStatus();

	String getEvent_icon();

}
