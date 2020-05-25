<template>
  <div class="page-container">
    <div class="page-container-header flex-box">
      <div class="flex-grow-1">
        <el-button icon="el-icon-plus" type="primary" @click="goto(`/flow/defform/add`)">
          {{i18n('operation.flow.defform.add')}}
        </el-button>
      </div>
      <div class="page-search-item">
        <el-select v-model="status" clearable>
          <el-option :label="i18n('label.all')" :value="null"/>
          <el-option :label="i18n('operation.enable')" :value="1"/>
          <el-option :label="i18n('operation.disable')" :value="0"/>
        </el-select>
      </div>
      <div class="page-search-item">
        <el-input v-model="keyword" :placeholder="i18n('message.placeholder')"/>
      </div>
      <div>
        <el-button icon="el-icon-search" @click="loadPage">{{i18n('operation.search')}}</el-button>
      </div>
    </div>
    <div class="page-container-body" ref="pageBody">
      <el-table ref="table"
                :data="tableData()"
                @selection-change="handleSelectionChange"
                @sort-change="handlerChangeSort"
                row-key="id" v-loading="pageLoading()" size="small"
                border fit highlight-current-row stripe>
        <el-table-column type="selection" width="36"/>

        <el-table-column
          align="center"
          :label="i18n('label.flow.defform.key')"
          sortable
          column-key="key"
          :width="tableColumnWidth(0.15,200)">
          <template slot-scope="scope">
            <span>{{scope.row.key}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="i18n('label.flow.defform.name')"
          sortable
          column-key="name"
          :width="tableColumnWidth(0.15,200)">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          :label="i18n('label.flow.defform.version')"
          sortable
          column-key="version"
          :width="tableColumnWidth(0.1,100)">
          <template slot-scope="scope">
            <span>{{scope.row.version}}</span>
          </template>
        </el-table-column>

        <el-table-column align="left" :label="i18n('label.flow.defform.desc')">
          <template slot-scope="scope">
            <span>{{scope.row.desc}}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" :label="i18n('label.flow.defform.status')" width="100" sortable
                         column-key="status">
          <template slot-scope="scope">
            <el-tooltip v-if="scope.row.status===1" :content="i18n(['operation.click','operation.disable'])"
                        placement="right">
              <el-button class="page-table-btn" type="success" @click="disable(scope.row.id)">
                {{i18n('operation.enable')}}
              </el-button>
            </el-tooltip>
            <el-tooltip v-else :content="i18n(['operation.click','operation.enable'])" placement="right">
              <el-button class="page-table-btn" type="warning" @click="enable(scope.row.id)">
                {{i18n('operation.disable')}}
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>


        <el-table-column align="center" :label="i18n('label.operation')" width="180" class-name="page-table-action"
                         fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="goto(`/flow/defform/edit/${scope.row.id}`)"
                       v-if="scope.row.used==0">
              {{i18n('operation.edit')}}
            </el-button>
            <el-button size="mini" type="primary" @click="goto(`/flow/defform/copy/${scope.row.id}`)">
              {{i18n('operation.copy')}}
            </el-button>
            <delete-btn @click="delete1(scope.row.id)" v-if="scope.row.used==0"/>
          </template>
        </el-table-column>
        <ApiComponent slot="empty" :data="pagesData()" :showLoading="false" @reload="reloadPage"/>
      </el-table>
    </div>
    <div class="page-container-footer flex-box">
      <div class="page-selection-info">
        <SelectedInfo :size="multipleSelection.length"/>
        <span v-if="multipleSelection.length>0">
          <a @click="handleClearSelection">{{i18n('operation.clearSelected')}}</a>
          <delete-batch @click="deletes"/>
        </span>
      </div>
      <div class="flex-grow-1">

      </div>
      <el-pagination
        v-if="showPagination()"
        background
        @size-change="handlerChangeSize"
        @current-change="handlerChangePage"
        @prev-click="handlerChangePage"
        @next-click="handlerChangePage"
        layout="total,sizes, prev, pager, next, jumper"
        :current-page.sync="defform.pages.data.pager.current"
        :page-size="pageSize()"
        :total="pageTotal()">
      </el-pagination>
    </div>
  </div>
</template>
<script src='./component.js'/>
<style src='./style.scss' rel='stylesheet/scss' lang='scss' scoped></style>
