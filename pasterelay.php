<?php
	header("Content-type: application/json");  
	if (isset($_GET['code'])) {

		$api_dev_key 			= 'lalalal post your dev key here'; // your api_developer_key
		$api_paste_code 		= $_GET['code']; // your paste text
		$api_paste_private 		= '1'; // 0=public 1=unlisted 2=private
		$api_paste_name			= $_GET['pname']; // name or title of your paste
		$api_paste_expire_date 	= 'N';
		$api_paste_format 		= 'logtalk';
		$api_user_key 			= ''; // if an invalid api_user_key or no key is used, the paste will be create as a guest
		$api_paste_name			= urlencode($api_paste_name);
		$api_paste_code			= urlencode($api_paste_code);


		$url 				= 'http://pastebin.com/api/api_post.php';
		$ch 				= curl_init($url);

		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, 'api_option=paste&api_user_key='.$api_user_key.'&api_paste_private='.$api_paste_private.'&api_paste_name='.$api_paste_name.'&api_paste_expire_date='.$api_paste_expire_date.'&api_paste_format='.$api_paste_format.'&api_dev_key='.$api_dev_key.'&api_paste_code='.$api_paste_code.'');
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_VERBOSE, 1);
		curl_setopt($ch, CURLOPT_NOBODY, 0);

		$response  			= $_GET['callback']."({'backupLink':'".curl_exec($ch)."'})";
		echo $response;
	}
	else {
		echo json_encode("false");
	}

?>