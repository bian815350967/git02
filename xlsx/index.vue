<template>
    <button @click="exportBtn"></button>
</template>

<script>
data() {
    exportData: []
}

methods: {
     /* 导出数据进行处理 */
    formatJson(filterVal) {
      const _this = this;
      // return this.similaralarmlists.map((v) =>
      return this.exportData.map((v) =>
        filterVal.map((j) => {
          if (j === 'state') {
            return _this.getDictName(ALARM_RECEIPT_STATUS, v[j]);
          } else if (j === 'is_invalid') {
            if (Number(v[j]) === 1) {
              return _this.$t('alarmReceivingList.invalid');
            }
            return _this.$t('alarmReceivingList.valid');
          } else if (j === 'handle_type') {
            return _this.getDictName(RECEIPT_ALARM_TYPE, v[j]);
          } else if (j === 'called_no_type') {
            return _this.getDictName(POLICE_TYPE, v[j]);
          } else if (j === 'level') {
            return _this.getDictName(ALARM_LEVEL, v[j]);
          } else if (j === 'source_type') {
            return _this.getDictName(ALARM_SOURCE_TYPE, v[j]);
          } else if (j === 'first_type') {
            return _this.getAlarmTypeName(ALARM_TYPE, v[j]);
          } else if (j === 'second_type') {
            return _this.getAlarmTypeName(ALARM_TYPE, v[j]);
          } else if (j === 'third_type') {
            return _this.getAlarmTypeName(ALARM_TYPE, v[j]);
          } else if (j === 'fourth_type') {
            return _this.getAlarmTypeName(ALARM_TYPE, v[j]);
          } else {
            return v[j];
          }
        }),
      );
    },
     async exportBtn() {
      if (!this.exportData || !this.exportData.length) {
        this.$message.error(this.$t('alarmReceivingList.noExportData'));
        return;
      }
      const hide = this.$message.loading(
        this.$t('alarmReceivinglist.exportExcel'),
        0,
      );
      setTimeout(hide, 2500);
      import('./index').then((excel) => {
        // const merge = ['C1:E1'];
        const tHeader = [
          '警单号',
          this.$t('alarmReceivingList.AlarmType'),
          '警情来源',
          this.$t('details.HandleType'),
          '类型：I',
          'II',
          'III',
          'IV',
          '状态',
          '报警电话',
          '报警人',
          '警情级别',
          '辖区单位',
          '接警单位',
          '事件描述',
          '接警员',
          this.$t('details.Addr'),
          this.$t('newAlarm.CallTime'),
          this.$t('newAlarm.isInvalid'),
          this.$t('alarmReceivingList.AlarmSearo'),
        ];

        const filterVal = [
          'id',
          'called_no_type',
          'source_type',
          'handle_type',
          'first_type',
          'second_type',
          'third_type',
          'fourth_type',
          'state',
          'contact_no',
          'caller_name',
          'level',
          'admin_dept_name',
          'receipt_dept_name',
          'content',
          'receipt_name',
          'addr',
          'receiving_time',
          'is_invalid',
          'receipt_seatno',
        ];

        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'ICC',
          // merges: merge
        });
      });
    },
}


</script>