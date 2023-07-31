import os
import psycopg2
import uuid
import datetime


class DBConnect:
    def connect(self):
        con = psycopg2.connect("host=" + "art-generator_db" +
                               " port=" + "5432" +
                               " dbname=" + os.environ['POSTGRES_DB'] +
                               " user=" + os.environ['POSTGRES_USER'] +
                               " password=" + os.environ['POSTGRES_PASSWORD'],
                               options="-c search_path=art_generator")
        return con

    def GetCurrentTimeStamp(self):
        dt_now = datetime.datetime.now()
        return dt_now.strftime('%Y-%m-%d %H:%M:%S')

    # 新しくレコードを追加する
    def InsertNewGenerateRecord(self):
        generate_id = "nft_genid_" + str(uuid.uuid4())
        generate_date = self.GetCurrentTimeStamp()
        con = self.connect()
        cur = con.cursor()
        sql = f"INSERT INTO generate_management (generate_id, generate_time, last_download_time, paid, dl_count)"\
            f"VALUES('{generate_id}', '{generate_date}', NULL, FALSE, 0)"
        cur.execute(sql)
        con.commit()
        con.close()
        return(generate_id)

    # 支払い完了登録
    def RegisterPaid(self, generate_id):
        con = self.connect()
        cur = con.cursor()
        sql = f"UPDATE generate_management " \
            f"SET paid = {True} "\
            f"WHERE generate_id = '{generate_id}';"
        cur.execute(sql)
        con.commit()
        con.close()

    # ダウンロード回数のインクリメント登録
    def IncrementDownloadCount(self, generate_id):
        target_row = self.SearchRecordById(generate_id)
        dl_count = int(target_row[0][4]) + 1
        paid_flag = True
        download_time = self.GetCurrentTimeStamp()
        con = self.connect()
        cur = con.cursor()
        sql = f"UPDATE generate_management " \
            f"SET last_download_time = '{download_time}', paid = {paid_flag},"\
            f"dl_count = {dl_count} WHERE generate_id = '{generate_id}';"
        cur.execute(sql)
        con.commit()
        con.close()

    # レコードをIDで検索する
    def SearchRecordById(self, generate_id):
        con = self.connect()
        cur = con.cursor()
        sql = f"SELECT * FROM generate_management WHERE generate_id = '{generate_id}';"
        cur.execute(sql)
        rows = cur.fetchall()
        con.close()
        return (rows)


# if __name__ == "__main__":
#     db_connect = DBConnect()
#     # db_connect.InsertNewGenerateRecord()
#     db_connect.RegisterDownloadData(
#         "nft_genid_bb669baa-94d2-40cc-b4e1-f8c2bd61d904")
