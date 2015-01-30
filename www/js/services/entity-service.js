"use strict";
 
angular.module('app.service.entity', [
    'app.service.db'
])

.factory('EntityService', 
    function(DBService) {

        return {

            loadById: function(entityId, userId) {
                //return DBService.selectOne("SELECT E.*, (SELECT 'T' FROM USER_ENTITY_FAVS WHERE EXISTS userId=? AND entityId=E.id) AS isFavorite FROM ENTITIES WHERE id=?", [userId, entityId])
                var self = this;
                return DBService.selectOne("SELECT E.*, (SELECT 'X' FROM USER_ENTITY_FAVS WHERE userId=? AND entityId=E.id) isFavorite FROM ENTITIES E WHERE E.id=?", [userId, entityId]).then(function(entity){
                    return self.getActivities(entity).then(function(activities){
                        entity.activities = activities;
                        if (entity.entityType==="HOU"){
                            return self.getMembers(entity).then(function(members){
                                entity.members = members;
                                return entity;
                            });
                        } else {
                            return entity;
                        }                        
                    })
                })
            },
            getByAgencyId: function(entityType, agencyId, userId){
                return DBService.select("SELECT E.*, (SELECT 'X' FROM USER_ENTITY_FAVS WHERE userId=? AND entityId=E.id) isFavorite FROM ENTITIES E WHERE E.agencyId=? AND E.entityType=?", [userId, agencyId, entityType])
                //return DBService.select("SELECT E.*, UEF.ID AS isFavorite FROM ENTITIES E LEFT OUTER JOIN USER_ENTITY_FAVS UEF ON UEF.entityId = E.id AND UEF.userId=? WHERE agencyId=? AND entityType='PSN'", [userId, agencyId])
            },
            save: function(entity){
                if (entity.id) {
                    var query = "UPDATE ENTITIES SET firstName=?, lastName=?, defaultAgency=?, email=?, latitude=?, longitude=? WHERE id=?";
                    return DBService.execute(query, [entity.firstName, entity.lastName, entity.defaultAgency, entity.email, entity.latitude, entity.longitude, entity.id]);
                } else {
                    var query = "INSERT ENTITIES AGENCY (firstName, lastName, defaultAgency, email, latitude, longitude) VALUES (?,?,?,?,?,?)";
                    return DBService.insert(query, [entity.firstName, entity.lastName, entity.defaultAgency, entity.email, entity.latitude, entity.longitude])
                }
            },
            getFavorites: function(entityType, agencyId, userId){
                return DBService.select("SELECT E.*, 'X' isFavorite FROM ENTITIES E, USER_ENTITY_FAVS F WHERE F.userId=? AND E.agencyId=? AND E.id = F.entityId AND E.entityType=?", [userId, agencyId, entityType]);
            },
            isFavorite: function(entity, userId){
                return DBService.exists("SELECT F.id FROM USER_ENTITY_FAVS F WHERE F.userId=? AND F.entityId=?", [userId, entity.id]);
            },
            addFavorite: function(entity, userId){
                return DBService.insert("INSERT INTO USER_ENTITY_FAVS (userId, entityId) VALUES (?,?)", [userId, entity.id]).then(function(){
                    entity.isFavorite = true;
                });
            },
            removeFavorite: function(entity, userId){
                return DBService.execute("DELETE FROM USER_ENTITY_FAVS WHERE userId=? AND entityId=?", [userId, entity.id]).then(function(){
                    entity.isFavorite = false;
                });
            },
            toggleFavorite: function(entity, userId){
                if (entity.isFavorite){
                    return this.removeFavorite(entity, userId);
                } else {
                    return this.addFavorite(entity, userId);
                }
            },
            getRecentlyViewed: function(entityType, agencyId, userId){
                return DBService.select("SELECT E.*, (SELECT 'X' FROM USER_ENTITY_FAVS F WHERE F.userId=? AND F.entityId=E.id) isFavorite FROM ENTITIES E, USER_ENTITY_RECENTS R WHERE E.agencyId=? AND E.entityType=? AND R.entityId=E.id AND R.userId=?", [userId, agencyId, entityType, userId])
            },
            addActivity: function(entity, activity){
                return DBService.insert("INSERT INTO ENTITY_ACTIVITIES (entityId, actType, descr, status, priority, actDate) VALUES (?,?,?,?,?,?)", [entity.id, activity.actType, activity.descr, activity.status, activity.priority, activity.actDate])
            },
            getActivities: function(entity){
                return DBService.select("SELECT * FROM ENTITY_ACTIVITIES WHERE entityId=?", [entity.id]);
            },
            getMembers: function(entity){
                return DBService.select("SELECT * FROM ENTITIES WHERE id IN (SELECT memberEntityId FROM ENTITY_MEMBERS WHERE entityId=?)", [entity.id]);
            }

        }

    }
)