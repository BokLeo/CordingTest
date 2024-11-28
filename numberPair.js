/*
문제 설명
두 정수 X, Y의 임의의 자리에서 공통으로 나타나는 정수 k(0 ≤ k ≤ 9)들을 이용하여 만들 수 있는 가장 큰 정수를 두 수의 짝꿍이라 합니다(단, 공통으로 나타나는 정수 중 서로 짝지을 수 있는 숫자만 사용합니다). X, Y의 짝꿍이 존재하지 않으면, 짝꿍은 -1입니다. X, Y의 짝꿍이 0으로만 구성되어 있다면, 짝꿍은 0입니다.

예를 들어, X = 3403이고 Y = 13203이라면, X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 3, 0, 3으로 만들 수 있는 가장 큰 정수인 330입니다. 다른 예시로 X = 5525이고 Y = 1255이면 X와 Y의 짝꿍은 X와 Y에서 공통으로 나타나는 2, 5, 5로 만들 수 있는 가장 큰 정수인 552입니다(X에는 5가 3개, Y에는 5가 2개 나타나므로 남는 5 한 개는 짝 지을 수 없습니다.)
두 정수 X, Y가 주어졌을 때, X, Y의 짝꿍을 return하는 solution 함수를 완성해주세요.

제한사항
3 ≤ X, Y의 길이(자릿수) ≤ 3,000,000입니다.
X, Y는 0으로 시작하지 않습니다.
X, Y의 짝꿍은 상당히 큰 정수일 수 있으므로, 문자열로 반환합니다.
입출력 예
X	Y	result
"100"	"2345"	"-1"
"100"	"203045"	"0"
"100"	"123450"	"10"
"12321"	"42531"	"321"
"5525"	"1255"	"552"
입출력 예 설명
입출력 예 #1

X, Y의 짝꿍은 존재하지 않습니다. 따라서 "-1"을 return합니다.
입출력 예 #2

X, Y의 공통된 숫자는 0으로만 구성되어 있기 때문에, 두 수의 짝꿍은 정수 0입니다. 따라서 "0"을 return합니다.
입출력 예 #3

X, Y의 짝꿍은 10이므로, "10"을 return합니다.
입출력 예 #4

X, Y의 짝꿍은 321입니다. 따라서 "321"을 return합니다.
입출력 예 #5

지문에 설명된 예시와 같습니다.
*/
function solutionErr(X, Y) {
	const xArr = X.split("");
	const yArr = Y.split("");
	const common = [];

	for (let i = 0; i < xArr.length; i++) {
		const x = xArr[i];
		if (yArr.includes(x)) {
			common.push(x);
			yArr.splice(yArr.indexOf(x), 1);
		}
	};

	if (common.length === 0) {
		// 공통된 숫자가 없다면 -1을 반환한다.
		return "-1";
	} else {
		// 공통된 숫자가 있다면 가장 큰 수를 만든다.
		const result = common.sort((a, b) => b - a).join("");
		return result[0] === "0" ? "0" : result;
	}

	/**
	 * ERROR 발생
	 * 원인 :
	 * 	- includes() 메서드는 배열에 특정 요소가 포함되어 있는지 확인하는 메서드이다. (시간복잡도 O(n))
	 * 	- splice() 메서드는 배열의 특정 요소를 제거하는 메서드이다. (시간복잡도 O(n))
	 *  - indexOf() 메서드는 배열에서 특정 요소의 인덱스를 반환하는 메서드이다. (최악의 경우 시간복잡도 O(n))
	 * 해결 :
	 * 	- Map과 Object를 사용하여 숫자의 빈도를 미리 계산하여 최적화한다.
	 */
}

function solution(X, Y) {
	const yCount = new Map();
	for (const char of Y) {
			yCount.set(char, (yCount.get(char) || 0) + 1);
	}
	const common = [];
	for (const char of X) {
			if (yCount.get(char) > 0) {
					common.push(char);
					yCount.set(char, yCount.get(char) - 1);
			}
	}
	if (common.length === 0) return "-1";

	const result = common.sort((a, b) => b - a).join("");
	return result[0] === "0" ? "0" : result;
}

function runTests() {
	const cases = [
			{ X: "100", Y: "2345", expected: "-1" },
			{ X: "100", Y: "203045", expected: "0" },
			{ X: "100", Y: "123450", expected: "10" },
			{ X: "12321", Y: "42531", expected: "321" },
			{ X: "5525", Y: "1255", expected: "552" },
			{ X: "000", Y: "00", expected: "0" }, // 공통 숫자가 0만 있는 경우
			{ X: "987654", Y: "456789", expected: "987654" }, // 모든 숫자가 일치하는 경우
			{ X: "1", Y: "1", expected: "1" }, // 한자리 공통 숫자
			{ X: "222", Y: "22", expected: "22" }, // 공통 숫자가 중복되는 경우
			{ X: "123", Y: "456", expected: "-1" }, // 공통 숫자가 없는 경우
	];

	let allPassed = true;

	cases.forEach(({ X, Y, expected }, index) => {
			const output = solution(X, Y);
			const passed = output === expected;
			console.log(`Test Case ${index + 1}: ${passed ? "Passed ✅" : "Failed ❌"}`);
			if (!passed) {
					console.log(`  Input: X="${X}", Y="${Y}"`);
					console.log(`  Expected: "${expected}", Got: "${output}"`);
					allPassed = false;
			}
	});

	if (allPassed) {
			console.log("\nAll test cases passed! 🎉");
	} else {
			console.log("\nSome test cases failed. Please review the code. 🛠️");
	}
}

runTests();