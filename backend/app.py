from Module.ExcelEdit import ExcelEdit
import threading
from flask import Flask, jsonify, request, send_file
import os
import json
import os
from Module.ImageGeneratorRarity import Generator
from PIL import Image
import shutil
import datetime
import glob
import stripe
app = Flask(__name__)
jobs = []


def GenerateJob(temp_item_list, max_items, folder_name, dirs):
    global jobs
    item_list = temp_item_list
    jobs.append(folder_name)
    for elem in temp_item_list:
        for elem2 in temp_item_list[elem]:
            item_list[elem][elem2]['image'] = (
                Image.open(temp_item_list[elem][elem2]['image_name']))
    generator = Generator()
    generator.ImageGeneratorRarity(item_list, max_items, folder_name, dirs)
    os.remove(f'./{folder_name}/items.csv')
    shutil.make_archive(folder_name, format='zip', root_dir=folder_name)
    jobs.remove(folder_name)


def GetCurrentTime():
    dt_now = datetime.datetime.now()
    return dt_now.strftime('%Y%m%d-%H-%M-%S')


@app.route("/generate", methods=['POST'])
def generateArt():
    for filename in glob.glob('*.zip'):
        os.remove(filename)
    global jobs
    jobs = []
    folder_name = GetCurrentTime()
    os.makedirs(f'{folder_name}_material', exist_ok=True)
    max_items_raw = request.form['max-items']
    max_items = json.loads(max_items_raw)
    fk_raw = request.form['file-keys']
    file_keys = json.loads(fk_raw)
    dirs_raw = request.form['dirs']
    dirs = json.loads(dirs_raw)
    item_list = {}

    for key in file_keys:
        key_list = key.split("-")
        # レイヤ層の有無
        if item_list.get(f"{key_list[0]}") is None:
            item_list[key_list[0]] = {}
        # アイテム層
        item_list[key_list[0]][key_list[1]] = {}
        # ファイルはサーバに保存する
        file = request.files.getlist(f"file-{key}")[0]
        filename = str(file.filename)
        filename = filename.split('/')[1]
        img = Image.open(file)
        img.save(
            f'{folder_name}_material/{key_list[0]}-{filename}')
        item_list[key_list[0]][key_list[1]]['image_name'] = \
            f'{folder_name}_material/{key_list[0]}-{filename}'
        item_list[key_list[0]][key_list[1]]['raw_filename'] = \
            f'{key_list[0]}/{filename}'
        item_list[key_list[0]][key_list[1]]['number'] =  \
            request.form[f"number-{key}"]
        item_list[key_list[0]][key_list[1]]['generated_number'] = 0
        item_list[key_list[0]][key_list[1]]['max_reached'] = False
        item_list[key_list[0]][key_list[1]]['rate'] = \
            request.form[f"rate-{key}"]
    # 記録ファイルの作成
    os.makedirs(folder_name, exist_ok=True)
    shutil.copyfile('./template/item.xlsm',
                    f'./{folder_name}/items.xlsm')
    # excel_operator = ExcelEdit()
    # excel_operator.SetFoldersSheet(folder_name, dirs)
    th = threading.Thread(
        target=GenerateJob,
        args=(
            item_list,
            max_items,
            folder_name,
            dirs))
    th.start()
    res = {'processingId': folder_name}
    return jsonify(res), 200


# 進行中のチェック
@app.route("/status", methods=['POST'])
def checkStatus():
    try:
        global jobs
        target_id_raw = request.form['targetId']
        max_items_raw = request.form['maxItem']
        target_id = json.loads(target_id_raw)
        max_item = json.loads(max_items_raw)
        file_count = sum(os.path.isfile(os.path.join(target_id, name))
                         for name in os.listdir(target_id))
        if(file_count >= int(max_item) + 1):
            if(os.path.exists(f"./{target_id}.zip")):
                shutil.rmtree(f"{target_id}_material")
                shutil.rmtree(f"{target_id}")
                send_filepath = f"./{target_id}.zip"
                return send_file(
                    send_filepath,
                    as_attachment=True,
                    download_name=f"{target_id}.zip",
                    mimetype='application/zip'), 200
        else:
            return(''), 200
    except FileNotFoundError:
        return(''), 200


# @app.route('/paid_check', methods=['POST'])
# def paidCheck():
#     # クライアントからのGenerateIDの取得
#     generate_id_raw = request.form['generateId']
#     generate_id = json.loads(generate_id_raw)

#     # GenerateIDを用いて、DB問い合わせ
#     db_connect = DBConnect()
#     is_paid = False
#     records = db_connect.SearchRecordById(generate_id)

#     # GenerateIDが存在していない場合はエラーとしてメッセージを返却しクライアント側はその旨を表示する
#     if(len(records) == 0):
#         return jsonify({"message": "NO_ID"}), 200

#     # GenerateIDが存在していたら、支払いステータスチェックを行う
#     is_paid = records[0][3]

#     if(is_paid):
#         # 支払済みならばGenerateIDに対応した本番コンテンツを返却するメッセージを返し再度ファイル要求してもらう
#         return jsonify({
#             "message": "OK",
#             "generateId": generate_id
#         }), 200
#     else:
#         # 未支払いの場合は未支払いメッセージを返却しstripeへクライアント側がつなぐ
#         return jsonify({"message": "UNPAID"}), 200


# @app.route('/download_production_contents', methods=['POST'])
# def downloadProductionContents():
#     # クライアントからのGenerateIDの取得
#     generate_id_raw = request.form['generateId']
#     generate_id = json.loads(generate_id_raw)

#     # ダウンロード回数のインクリメント
#     db_connect = DBConnect()
#     db_connect.IncrementDownloadCount(generate_id)

#     # コンテンツのダウンロード
#     send_filepath = f"./{generate_id}.zip"
#     return send_file(
#         send_filepath,
#         as_attachment=True,
#         download_name=f"{generate_id}.zip",
#         mimetype='application/zip'), 200


# @app.route('/webhook', methods=['POST'])
# def webhook():
#     event = stripe.Event.construct_from(
#         request.json,
#         os.getenv('STRIPE_SECRET_KEY')
#     )
#     print("==========")
#     print(event.type)
#     print(event.data.object)
#     print(event.data.object.id)
#     print("----------")
#     if event.type == 'payment_intent.created':
#         payment_intent = event.data.object
#         print('Payment was created! ' + payment_intent.id)
#         print('status: ' + payment_intent.status)
#     if event.type == 'checkout.session.completed':
#         checkout_session = event.data.object
#         print('Checkout Session completed! ' + checkout_session.id)

#     return jsonify({'message': 'success'})


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5100, threaded=True)
