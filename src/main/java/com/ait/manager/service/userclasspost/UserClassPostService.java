package com.ait.manager.service.userclasspost;


import com.ait.manager.model.UserClassPost;
import com.ait.manager.service.GeneralService;

public interface UserClassPostService extends GeneralService<UserClassPost> {
    void deleteFindByPostId(Long id);
}
