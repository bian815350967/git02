
<template>
  <div>
    <button @click="printBtn"> 打印 </button>
  </div>
</template>

<script>
	import printJS from 'print-js';
  export default {
    methods: {
          /* 打印 */
        printBtn() {
        if (!this.exportData || !this.exportData.length) {
            this.$message.error(this.$t('alarmTransfer.selectAlarm'));
            return;
        }
        this.list = this.exportData;
        const data = [];
        for (let i = 0; i < this.list.length; i++) {
            data.push({
            level: this.getDictName(ALARM_LEVEL, this.list[i].level),
            type: this.getAlarmTypeName(ALARM_TYPE, this.list[i].first_type),
            content: this.list[i].content
                // eslint-disable-next-line no-control-regex
                .replace(/[^\x00-\xff]/g, '$&\x01')
                // eslint-disable-next-line no-control-regex
                .replace(/.{7}\x01?/g, '$&\n')
                // eslint-disable-next-line no-control-regex
                .replace(/\x01/g, ''),
            state: this.getDictName(ALARM_RECEIPT_STATUS, this.list[i].state),
            source_type: this.getDictName(
                ALARM_SOURCE_TYPE,
                this.list[i].source_type,
            ),
            id: this.list[i].id,
            caller_name: this.list[i].caller_name,
            contact_no: this.list[i].contact_no,
            admin_dept_name: this.list[i].admin_dept_name,
            receipt_dept_name: this.list[i].receipt_dept_name,
            receipt_name: this.list[i].receipt_name,
            // addr: this.list[i].addr,
            // called_no_type: this.getDictName(
            //   POLICE_TYPE,
            //   this.list[i].called_no_type,
            // ),
            // handle_type:
            //   this.getDictName(RECEIPT_ALARM_TYPE, this.list[i].handle_type) +
            //   '<br>' +
            //   this.list[i].receiving_time,
            // receiving_time: this.list[i].receiving_time,
            // receipt_seatno: this.list[i].receipt_seatno,
            });
        }
        printJS({
            documentTitle: '',
            printable: data,
            properties: [
            {
                field: 'level',
                displayName: this.$t('alarmReceivingList.AlarmLevel'),
                columnSize: '10%',
            },
            {
                field: 'type',
                displayName: this.$t('alarmReceivingList.AlarmNature'),
                columnSize: '8%',
            },
            {
                field: 'content',
                displayName: this.$t('newAlarm.AlarmDescript'),
                columnSize: '16%',
            },
            {
                field: 'state',
                displayName: this.$t('alarmFiltering.alarmStatus'),
                columnSize: '8%',
            },
            {
                field: 'source_type',
                displayName: this.$t('alarmFiltering.alarmSource'),
                columnSize: '8%',
            },
            {
                field: 'id',
                displayName: this.$t('newAlarm.SourceId'),
                columnSize: '14%',
            },
            {
                field: 'caller_name',
                displayName: this.$t('newAlarm.CallerName'),
                columnSize: '7%',
            },
            {
                field: 'contact_no',
                displayName: this.$t('newAlarm.CallNo'),
                columnSize: '7%',
            },
            {
                field: 'admin_dept_name',
                displayName: this.$t('newAlarm.DistrictUnit'),
                columnSize: '8%',
            },
            {
                field: 'receipt_dept_name',
                displayName: this.$t('newAlarm.TransferUnit'),
                columnSize: '8%',
            },
            {
                field: 'receipt_name',
                displayName: this.$t('newAlarm.Receiver'),
                columnSize: '7%',
            },
            // {
            //   field: 'addr',
            //   displayName: this.$t('details.Addr'),
            //   columnSize: '7%',
            // },
            // {
            //   field: 'called_no_type',
            //   displayName: this.$t('alarmReceivingList.AlarmType'),
            //   columnSize: '7%',
            // },
            // {
            //   field: 'handle_type',
            //   displayName: this.$t('details.HandleType'),
            //   columnSize: '7%',
            // },
            // {
            //   field: 'receiving_time',
            //   displayName: this.$t('newAlarm.CallTime'),
            //   columnSize: '10%',
            // },
            // {
            //   field: 'receipt_seatno',
            //   displayName: this.$t('alarmReceivingList.AlarmSearo'),
            //   columnSize: '7%',
            // },
            ],
            type: 'json',
            header: this.$t('policeInfoQuery.alarmReceivingList'),
            headerStyle: 'text-align: center',
            style:
            'td { word-break: break-all; text-align: center } @page { margin: 0; }',
            // 样式设置
            gridStyle:
            'border: 1px solid lightgray; margin-bottom: -1px;font-size:12px',
            gridHeaderStyle:
            'font-weight:normal;font-size:12px;border: 1px solid #ccc;',
        });
        },
    }
  }
</script>

<style scoped>

</style>