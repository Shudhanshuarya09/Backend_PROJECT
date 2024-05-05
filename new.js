#include <iostream> 
#include <vector> 
int longestAscendingSubsequence(const std::vector<int>& nums) { 
 if (nums.empty()) 
 return 0; 
 int n = nums.size(); 
 // Initialize an array to store the length of the longest ascending subsequence ending at each index 
 std::vector<int> dp(n, 1); 
 // Iterate through the array 
 for (int i = 1; i < n; ++i) { 
 // For each index, check all previous indices 
 for (int j = 0; j < i; ++j) { 
 // If the current element is greater than the element at index j, 
 // and if the length of the subsequence ending at j plus 1 is greater than the length 
 // of the subsequence ending at i, update the length of the subsequence ending at i. 
 if (nums[i] > nums[j] && dp[j] + 1 > dp[i]) { 
 dp[i] = dp[j] + 1; 
 } 
 } 
 } 
 // Return the maximum length of the subsequence 
 return *std::max_element(dp.begin(), dp.end()); 
} 
int main() { 
 std::vector<int> nums = {10, 22, 9, 33, 21, 50, 41, 60, 80}; 
 std::cout << "Length of the longest ascending subsequence: " << 
longestAscendingSubsequence(nums) << std::endl; 
 return 0; 
} 