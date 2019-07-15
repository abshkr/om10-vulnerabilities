from django.db import models


class ExpiryDateDetails(models.Model):
    id = models.CharField(
        primary_key=True, db_column="ed_object_id", max_length=64)
    ed_target_code = models.CharField(max_length=32, blank=True,)
    ed_cmpy_code = models.CharField(max_length=16, blank=True)
    ed_type_code = models.CharField(max_length=32, blank=True,)
    ed_exp_date = models.CharField(blank=True, max_length=256)
    ed_status = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'EXPIRY_DATE_DETAILS'
