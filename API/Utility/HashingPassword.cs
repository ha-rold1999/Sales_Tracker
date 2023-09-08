using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Cryptography;

namespace Utility
{
    public static class HashingPassword
    {
        private static readonly byte[] salt = new byte[32];
        public static string HashPasswordFactory(string password)
        {
            var drivenBytes = new Rfc2898DeriveBytes(password, salt, 1000, HashAlgorithmName.SHA256);
            byte[] hash = drivenBytes.GetBytes(20);
            byte[] hashBytes = new byte[36];
            Array.Copy(salt, 0, hashBytes, 0, 16);
            Array.Copy(hash, 0, hashBytes, 16, 20);

            return Convert.ToBase64String(hashBytes);
        }
    }
}
