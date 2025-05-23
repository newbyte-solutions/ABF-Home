
Ui to show what items they are renting out with the following:
- [x] Status (available or rented)
- [x] Image, Description, Title, Category, Type, Specs (reference item.ts)
- [x] Category filter
- [x] Tags filter (get tags from db)

Needs a management panel:
- [ ] Update Meta data, filters and tags and other things that dont go trough manage in /ftf/admin/edit
- [ ] Manage status, availabilty, checkin and out trough /ftf/admin/manage
- [ ] Check logs (repairs, anything else) in ftf/admin/logs/_id or just /logs for a global log.
- [ ] Make logs (applied to each object but as seperate collection?) in ftf/admin/logs/_id per object?
- [ ] Make new items and delete / edit existing ones trough /ftf/admin/create
- [ ] Markup for the logs possibly