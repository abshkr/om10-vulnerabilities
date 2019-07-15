from django.db import models


class Equipment(models.Model):
    id = models.IntegerField(primary_key=True, db_column="eqpt_id")
    eqpt_title = models.CharField(max_length=40, blank=True, null=True)
    eqpt_tanker = models.CharField(max_length=40, blank=True, null=True)
    eqpt_owner = models.CharField(max_length=40, blank=True, null=True)
    eqpt_owner_name = models.CharField(max_length=16, blank=True, null=True)
    eqpt_etp = models.IntegerField()
    eqpt_etp_title = models.CharField(max_length=40, blank=True, null=True)
    eqpt_exp_d1_dmy = models.DateTimeField(blank=True, null=True)
    eqpt_exp_d2_dmy = models.DateTimeField(blank=True, null=True)
    eqpt_exp_d3_dmy = models.DateTimeField(blank=True, null=True)
    eqpt_lock = models.CharField(max_length=2, blank=True, null=True)
    eqpt_empty_kg = models.FloatField(max_length=126, blank=True, null=True)
    eqp_must_tare_in = models.CharField(max_length=2, blank=True, null=True)
    eqpt_max_gross = models.FloatField(max_length=126, blank=True, null=True)
    eqpt_comments = models.CharField(max_length=4000, blank=True, null=True)
    eqpt_area = models.IntegerField()
    eqpt_area_name = models.CharField(max_length=40, blank=True, null=True)
    eqpt_load_type = models.CharField(max_length=2, blank=True, null=True)
    eqpt_last_modified = models.DateTimeField(blank=True, null=True)
    eqpt_last_used = models.DateTimeField(blank=True, null=True)
    eqpt_load_type_name = models.CharField(
        max_length=255, blank=True, null=True)
    etyp_category = models.CharField(max_length=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'GUI_EQUIPMENT_LIST'
